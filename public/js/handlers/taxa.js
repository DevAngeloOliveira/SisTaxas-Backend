async function loadTaxas() {
    try {
        window.taxas = await api.getTaxas();
        renderTaxas();
        const totalBadge = document.getElementById('totalTaxas');
        if (totalBadge) {
            totalBadge.textContent = `${window.taxas.length} ${window.taxas.length === 1 ? 'taxa' : 'taxas'}`;
        }
    } catch (error) {
        console.error('Erro ao carregar taxas:', error);
        alert(error.message || 'Erro ao carregar taxas');
    }
}

function renderTaxas() {
    const tbody = document.getElementById('taxasTableBody');
    if (tbody) {
        tbody.innerHTML = window.taxas.map(taxa => `
            <tr>
                <td>${taxa.codigo}</td>
                <td>${taxa.taxa}</td>
                <td>R$ ${taxa.valor.toFixed(2)}</td>
                <td>${taxa.exercicio}</td>
                <td class="action-buttons">
                    <button class="btn btn-sm btn-primary" onclick="editTaxa(${taxa.id})">Editar</button>
                    <button class="btn btn-sm btn-danger" onclick="deleteTaxa(${taxa.id})">Excluir</button>
                </td>
            </tr>
        `).join('');
    }
}

function validateTaxaForm() {
    const codigo = document.getElementById('taxaCodigo').value.trim();
    const nome = document.getElementById('taxaNome').value.trim();
    const valor = document.getElementById('taxaValor').value;
    const exercicio = document.getElementById('taxaExercicio').value;

    if (!codigo) {
        alert('O código da taxa é obrigatório');
        return false;
    }

    if (!nome) {
        alert('O nome da taxa é obrigatório');
        return false;
    }

    if (!valor || parseFloat(valor) <= 0) {
        alert('O valor da taxa deve ser maior que zero');
        return false;
    }

    if (!exercicio || parseInt(exercicio) <= 0) {
        alert('O exercício é obrigatório');
        return false;
    }

    return true;
}

async function handleTaxaSubmit(event) {
    event.preventDefault();
    
    if (!validateTaxaForm()) {
        return;
    }

    try {
        const id = document.getElementById('taxaId').value;
        const data = {
            codigo: document.getElementById('taxaCodigo').value.trim(),
            taxa: document.getElementById('taxaNome').value.trim(),
            valor: parseFloat(document.getElementById('taxaValor').value),
            exercicio: parseInt(document.getElementById('taxaExercicio').value)
        };

        if (id) {
            await api.updateTaxa(id, data);
        } else {
            await api.createTaxa(data);
        }
        
        await loadTaxas();
        if (window.modals.taxa) {
            window.modals.taxa.hide();
        }
    } catch (error) {
        console.error('Erro ao salvar taxa:', error);
        alert(error.message || 'Erro ao salvar taxa');
    }
}

async function editTaxa(id) {
    try {
        const taxa = window.taxas.find(t => t.id === id);
        if (taxa) {
            document.getElementById('taxaId').value = taxa.id;
            document.getElementById('taxaCodigo').value = taxa.codigo;
            document.getElementById('taxaNome').value = taxa.taxa;
            document.getElementById('taxaValor').value = taxa.valor;
            document.getElementById('taxaExercicio').value = taxa.exercicio;
            if (window.modals.taxa) {
                window.modals.taxa.show();
            }
        } else {
            throw new Error('Taxa não encontrada');
        }
    } catch (error) {
        console.error('Erro ao editar taxa:', error);
        alert(error.message || 'Erro ao carregar dados da taxa');
    }
}

async function deleteTaxa(id) {
    if (confirm('Tem certeza que deseja excluir esta taxa?')) {
        try {
            await api.deleteTaxa(id);
            await loadTaxas();
        } catch (error) {
            console.error('Erro ao excluir taxa:', error);
            alert(error.message || 'Erro ao excluir taxa');
        }
    }
} 