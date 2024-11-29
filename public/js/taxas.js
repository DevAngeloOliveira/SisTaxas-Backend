let taxas = [];
const taxaModal = new bootstrap.Modal(document.getElementById('taxaModal'));

async function loadTaxas() {
    try {
        taxas = await api.getTaxas();
        renderTaxas();
        updateEmpresaSelect('taxaEmpresa');
    } catch (error) {
        alert('Erro ao carregar taxas');
    }
}

function renderTaxas() {
    const tbody = document.getElementById('taxasTableBody');
    tbody.innerHTML = taxas.map(taxa => `
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

document.getElementById('taxaForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const id = document.getElementById('taxaId').value;
    const data = {
        codigo: document.getElementById('taxaCodigo').value,
        taxa: document.getElementById('taxaNome').value,
        valor: parseFloat(document.getElementById('taxaValor').value),
        exercicio: parseInt(document.getElementById('taxaExercicio').value),
        idEmpresa: document.getElementById('taxaEmpresa').value
    };

    try {
        if (id) {
            await api.updateTaxa(id, data);
        } else {
            await api.createTaxa(data);
        }
        
        await loadTaxas();
        taxaModal.hide();
        document.getElementById('taxaForm').reset();
        document.getElementById('taxaId').value = '';
    } catch (error) {
        alert('Erro ao salvar taxa');
    }
});

async function editTaxa(id) {
    const taxa = taxas.find(t => t.id === id);
    if (taxa) {
        document.getElementById('taxaId').value = taxa.id;
        document.getElementById('taxaCodigo').value = taxa.codigo;
        document.getElementById('taxaNome').value = taxa.taxa;
        document.getElementById('taxaValor').value = taxa.valor;
        document.getElementById('taxaExercicio').value = taxa.exercicio;
        document.getElementById('taxaEmpresa').value = taxa.idEmpresa;
        taxaModal.show();
        document.getElementById('taxaCodigo').focus();
    }
}

async function deleteTaxa(id) {
    if (confirm('Tem certeza que deseja excluir esta taxa?')) {
        try {
            await api.deleteTaxa(id);
            await loadTaxas();
        } catch (error) {
            alert('Erro ao excluir taxa');
        }
    }
}

// Limpar formulário quando o modal for fechado
document.getElementById('taxaModal').addEventListener('hidden.bs.modal', () => {
    document.getElementById('taxaForm').reset();
    document.getElementById('taxaId').value = '';
});

// Garantir que o foco seja removido antes de fechar o modal
document.getElementById('taxaModal').addEventListener('hide.bs.modal', () => {
    document.activeElement.blur();
}); 