let usuarios = [];
const usuarioModal = new bootstrap.Modal(document.getElementById('usuarioModal'));

async function loadUsuarios() {
    try {
        usuarios = await api.getUsuarios();
        renderUsuarios();
        updateEmpresaSelect('usuarioEmpresa');
    } catch (error) {
        alert('Erro ao carregar usuários');
    }
}

function renderUsuarios() {
    const tbody = document.getElementById('usuariosTableBody');
    tbody.innerHTML = usuarios.map(usuario => `
        <tr>
            <td>${usuario.usuario}</td>
            <td>${usuario.CPF}</td>
            <td>${usuario.login}</td>
            <td>${empresas.find(e => e.id === usuario.idEmpresa)?.empresa || ''}</td>
            <td class="action-buttons">
                <button class="btn btn-sm btn-primary" onclick="editUsuario(${usuario.id})">Editar</button>
                <button class="btn btn-sm btn-danger" onclick="deleteUsuario(${usuario.id})">Excluir</button>
            </td>
        </tr>
    `).join('');
}

document.getElementById('usuarioForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const id = document.getElementById('usuarioId').value;
    const data = {
        usuario: document.getElementById('usuarioNome').value,
        CPF: document.getElementById('usuarioCPF').value,
        login: document.getElementById('usuarioLogin').value,
        idEmpresa: document.getElementById('usuarioEmpresa').value
    };

    const senha = document.getElementById('usuarioSenha').value;
    if (senha) {
        data.senha = senha;
    }

    try {
        if (id) {
            await api.updateUsuario(id, data);
        } else {
            await api.createUsuario(data);
        }
        
        await loadUsuarios();
        usuarioModal.hide();
        document.getElementById('usuarioForm').reset();
        document.getElementById('usuarioId').value = '';
    } catch (error) {
        if (error.response?.status === 403) {
            alert('Você não tem permissão para realizar esta operação');
        } else {
            alert('Erro ao salvar usuário');
        }
    }
});

async function editUsuario(id) {
    const usuario = usuarios.find(u => u.id === id);
    if (usuario) {
        document.getElementById('usuarioId').value = usuario.id;
        document.getElementById('usuarioNome').value = usuario.usuario;
        document.getElementById('usuarioCPF').value = usuario.CPF;
        document.getElementById('usuarioLogin').value = usuario.login;
        document.getElementById('usuarioEmpresa').value = usuario.idEmpresa;
        document.getElementById('usuarioSenha').value = '';
        usuarioModal.show();
        document.getElementById('usuarioNome').focus();
    }
}

async function deleteUsuario(id) {
    if (confirm('Tem certeza que deseja excluir este usuário?')) {
        try {
            await api.deleteUsuario(id);
            await loadUsuarios();
        } catch (error) {
            if (error.response?.status === 403) {
                alert('Você não tem permissão para realizar esta operação');
            } else {
                alert('Erro ao excluir usuário');
            }
        }
    }
}

// Limpar formulário quando o modal for fechado
document.getElementById('usuarioModal').addEventListener('hidden.bs.modal', () => {
    document.getElementById('usuarioForm').reset();
    document.getElementById('usuarioId').value = '';
});

// Garantir que o foco seja removido antes de fechar o modal
document.getElementById('usuarioModal').addEventListener('hide.bs.modal', () => {
    document.activeElement.blur();
}); 