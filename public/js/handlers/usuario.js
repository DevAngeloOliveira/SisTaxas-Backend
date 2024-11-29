async function loadUsuarios() {
    try {
        window.usuarios = await api.getUsuarios();
        renderUsuarios();
        const totalBadge = document.getElementById('totalUsuarios');
        if (totalBadge) {
            totalBadge.textContent = `${window.usuarios.length} ${window.usuarios.length === 1 ? 'usuário' : 'usuários'}`;
        }
    } catch (error) {
        console.error('Erro ao carregar usuários:', error);
        alert(error.message || 'Erro ao carregar usuários');
    }
}

function renderUsuarios() {
    const tbody = document.getElementById('usuariosTableBody');
    if (tbody) {
        tbody.innerHTML = window.usuarios.map(usuario => `
            <tr>
                <td>${usuario.usuario}</td>
                <td>${usuario.CPF}</td>
                <td>${usuario.login}</td>
                <td>${window.empresas.find(e => e.id === usuario.idEmpresa)?.empresa || ''}</td>
                <td class="action-buttons">
                    <button class="btn btn-sm btn-primary" onclick="editUsuario(${usuario.id})">Editar</button>
                    <button class="btn btn-sm btn-danger" onclick="deleteUsuario(${usuario.id})">Excluir</button>
                </td>
            </tr>
        `).join('');
    }
}

function validateUsuarioForm() {
    const nome = document.getElementById('usuarioNome').value.trim();
    const cpf = document.getElementById('usuarioCPF').value.trim();
    const login = document.getElementById('usuarioLogin').value.trim();
    const empresa = document.getElementById('usuarioEmpresa').value;

    if (!nome) {
        alert('O nome do usuário é obrigatório');
        return false;
    }

    if (!cpf || cpf.length !== 11) {
        alert('CPF inválido. Digite apenas os números (11 dígitos)');
        return false;
    }

    if (!login) {
        alert('O login é obrigatório');
        return false;
    }

    if (!empresa) {
        alert('A empresa é obrigatória');
        return false;
    }

    return true;
}

async function handleUsuarioSubmit(event) {
    event.preventDefault();
    
    if (!validateUsuarioForm()) {
        return;
    }

    try {
        const id = document.getElementById('usuarioId').value;
        const data = {
            usuario: document.getElementById('usuarioNome').value.trim(),
            CPF: document.getElementById('usuarioCPF').value.trim(),
            login: document.getElementById('usuarioLogin').value.trim(),
            idEmpresa: document.getElementById('usuarioEmpresa').value
        };

        const senha = document.getElementById('usuarioSenha').value.trim();
        if (senha) {
            data.senha = senha;
        }

        if (id) {
            await api.updateUsuario(id, data);
        } else {
            if (!senha) {
                alert('A senha é obrigatória para novos usuários');
                return;
            }
            await api.createUsuario(data);
        }
        
        await loadUsuarios();
        if (window.modals.usuario) {
            window.modals.usuario.hide();
        }
    } catch (error) {
        console.error('Erro ao salvar usuário:', error);
        alert(error.message || 'Erro ao salvar usuário');
    }
}

async function editUsuario(id) {
    try {
        const usuario = window.usuarios.find(u => u.id === id);
        if (usuario) {
            document.getElementById('usuarioId').value = usuario.id;
            document.getElementById('usuarioNome').value = usuario.usuario;
            document.getElementById('usuarioCPF').value = usuario.CPF;
            document.getElementById('usuarioLogin').value = usuario.login;
            document.getElementById('usuarioEmpresa').value = usuario.idEmpresa;
            document.getElementById('usuarioSenha').value = '';
            if (window.modals.usuario) {
                window.modals.usuario.show();
            }
        } else {
            throw new Error('Usuário não encontrado');
        }
    } catch (error) {
        console.error('Erro ao editar usuário:', error);
        alert(error.message || 'Erro ao carregar dados do usuário');
    }
}

async function deleteUsuario(id) {
    if (confirm('Tem certeza que deseja excluir este usuário?')) {
        try {
            await api.deleteUsuario(id);
            await loadUsuarios();
        } catch (error) {
            console.error('Erro ao excluir usuário:', error);
            alert(error.message || 'Erro ao excluir usuário');
        }
    }
} 