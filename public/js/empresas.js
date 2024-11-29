let empresas = [];

async function loadEmpresas() {
    try {
        empresas = await api.getEmpresas();
        window.empresas = empresas;
        renderEmpresas();
    } catch (error) {
        console.error('Erro ao carregar empresas:', error);
        alert(error.message || 'Erro ao carregar empresas');
    }
}

function renderEmpresas() {
    const tbody = document.getElementById('empresasTableBody');
    if (tbody) {
        tbody.innerHTML = empresas.map(empresa => `
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

async function editEmpresa(id) {
    try {
        const empresa = empresas.find(e => e.id === id);
        if (empresa) {
            document.getElementById('empresaId').value = empresa.id;
            document.getElementById('empresaCNPJ').value = empresa.CNPJ;
            document.getElementById('empresaNome').value = empresa.empresa;
            if (window.modals && window.modals.empresa) {
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

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    // Configurar formulário
    const form = document.getElementById('empresaForm');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
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
                if (window.modals && window.modals.empresa) {
                    window.modals.empresa.hide();
                }
            } catch (error) {
                console.error('Erro ao salvar empresa:', error);
                alert(error.message || 'Erro ao salvar empresa');
            }
        });
    }

    // Configurar eventos do modal
    const modal = document.getElementById('empresaModal');
    if (modal) {
        modal.addEventListener('hidden.bs.modal', () => {
            const form = document.getElementById('empresaForm');
            if (form) {
                form.reset();
                const idInput = document.getElementById('empresaId');
                if (idInput) idInput.value = '';
            }
        });

        modal.addEventListener('hide.bs.modal', () => {
            if (document.activeElement) {
                document.activeElement.blur();
            }
        });
    }
}); 