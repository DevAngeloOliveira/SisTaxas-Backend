let contribuintes = [];

async function loadContribuintes() {
    try {
        contribuintes = await api.getContribuintes();
        renderContribuintes();
    } catch (error) {
        console.error('Erro ao carregar contribuintes:', error);
        alert(error.message || 'Erro ao carregar contribuintes');
    }
}

function renderContribuintes() {
    const tbody = document.getElementById('contribuintesTableBody');
    if (tbody) {
        tbody.innerHTML = contribuintes.map(contribuinte => `
            <tr>
                <td>${contribuinte.nome}</td>
                <td>${contribuinte.CPF}</td>
                <td>${contribuinte.idEmpresa}</td>
                <td class="action-buttons">
                    <button class="btn btn-sm btn-primary" onclick="editContribuinte(${contribuinte.id})">Editar</button>
                    <button class="btn btn-sm btn-danger" onclick="deleteContribuinte(${contribuinte.id})">Excluir</button>
                </td>
            </tr>
        `).join('');
    }
}

function validateForm() {
    const nome = document.getElementById('contribuinteNome').value.trim();
    const cpf = document.getElementById('contribuinteCPF').value.trim();

    if (!nome) {
        alert('O nome do contribuinte é obrigatório');
        return false;
    }

    if (!cpf || cpf.length !== 11) {
        alert('CPF inválido. Digite apenas os números (11 dígitos)');
        return false;
    }

    return true;
}

async function editContribuinte(id) {
    try {
        const contribuinte = contribuintes.find(c => c.id === id);
        if (contribuinte) {
            document.getElementById('contribuinteId').value = contribuinte.id;
            document.getElementById('contribuinteNome').value = contribuinte.nome;
            document.getElementById('contribuinteCPF').value = contribuinte.CPF;
            if (window.modals && window.modals.contribuinte) {
                window.modals.contribuinte.show();
            }
        } else {
            throw new Error('Contribuinte não encontrado');
        }
    } catch (error) {
        console.error('Erro ao editar contribuinte:', error);
        alert(error.message || 'Erro ao carregar dados do contribuinte');
    }
}

async function deleteContribuinte(id) {
    if (confirm('Tem certeza que deseja excluir este contribuinte?')) {
        try {
            await api.deleteContribuinte(id);
            await loadContribuintes();
        } catch (error) {
            console.error('Erro ao excluir contribuinte:', error);
            alert(error.message || 'Erro ao excluir contribuinte');
        }
    }
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    // Configurar formulário
    const form = document.getElementById('contribuinteForm');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            if (!validateForm()) {
                return;
            }

            try {
                const id = document.getElementById('contribuinteId').value;
                const data = {
                    nome: document.getElementById('contribuinteNome').value.trim(),
                    CPF: document.getElementById('contribuinteCPF').value.trim()
                };

                if (id) {
                    await api.updateContribuinte(id, data);
                } else {
                    await api.createContribuinte(data);
                }
                
                await loadContribuintes();
                if (window.modals && window.modals.contribuinte) {
                    window.modals.contribuinte.hide();
                }
            } catch (error) {
                console.error('Erro ao salvar contribuinte:', error);
                alert(error.message || 'Erro ao salvar contribuinte');
            }
        });
    }

    // Configurar eventos do modal
    const modal = document.getElementById('contribuinteModal');
    if (modal) {
        modal.addEventListener('hidden.bs.modal', () => {
            const form = document.getElementById('contribuinteForm');
            if (form) {
                form.reset();
                const idInput = document.getElementById('contribuinteId');
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