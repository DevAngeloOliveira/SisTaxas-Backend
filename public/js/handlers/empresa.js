async function loadEmpresas() {
    try {
        window.empresas = await api.getEmpresas();
        renderEmpresas();
        const totalBadge = document.getElementById('totalEmpresas');
        if (totalBadge) {
            totalBadge.textContent = `${window.empresas.length} ${window.empresas.length === 1 ? 'empresa' : 'empresas'}`;
        }
    } catch (error) {
        console.error('Erro ao carregar empresas:', error);
        alert(error.message || 'Erro ao carregar empresas');
    }
}

function renderEmpresas() {
    const tbody = document.getElementById('empresasTableBody');
    if (tbody) {
        tbody.innerHTML = window.empresas.map(empresa => `
            <tr>
                <td>${empresa.CNPJ}</td>
                <td>${empresa.empresa}</td>
                <td class="action-buttons">
                    <button class="btn btn-sm btn-primary" onclick="editEmpresa(${empresa.id})">Editar</button>
                    <button class="btn btn-sm btn-danger" onclick="deleteEmpresa(${empresa.id})">Excluir</button>
                </td>
            </tr>
        `).join('');
    }
}

async function handleEmpresaSubmit(event) {
    event.preventDefault();
    
    const id = document.getElementById('empresaId').value;
    const data = {
        CNPJ: document.getElementById('empresaCNPJ').value.trim(),
        empresa: document.getElementById('empresaNome').value.trim()
    };

    try {
        if (id) {
            await api.updateEmpresa(id, data);
        } else {
            await api.createEmpresa(data);
        }
        
        await loadEmpresas();
        if (window.modals.empresa) {
            window.modals.empresa.hide();
        }
    } catch (error) {
        console.error('Erro ao salvar empresa:', error);
        alert(error.message || 'Erro ao salvar empresa');
    }
}

async function editEmpresa(id) {
    try {
        const empresa = window.empresas.find(e => e.id === id);
        if (empresa) {
            document.getElementById('empresaId').value = empresa.id;
            document.getElementById('empresaCNPJ').value = empresa.CNPJ;
            document.getElementById('empresaNome').value = empresa.empresa;
            if (window.modals.empresa) {
                window.modals.empresa.show();
            }
        } else {
            throw new Error('Empresa não encontrada');
        }
    } catch (error) {
        console.error('Erro ao editar empresa:', error);
        alert(error.message || 'Erro ao carregar dados da empresa');
    }
}

async function deleteEmpresa(id) {
    if (confirm('Tem certeza que deseja excluir esta empresa?')) {
        try {
            await api.deleteEmpresa(id);
            await loadEmpresas();
        } catch (error) {
            console.error('Erro ao excluir empresa:', error);
            alert(error.message || 'Erro ao excluir empresa');
        }
    }
} 