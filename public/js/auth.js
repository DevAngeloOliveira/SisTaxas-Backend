document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const login = document.getElementById('login').value;
    const senha = document.getElementById('senha').value;

    try {
        const response = await api.login({ login, senha });
        
        if (response.error) {
            alert(response.error);
            return;
        }

        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.usuario));

        document.getElementById('loginForm').classList.add('d-none');
        document.getElementById('mainContent').classList.remove('d-none');

        // Carregar dados iniciais
        loadEmpresas();
    } catch (error) {
        alert('Erro ao fazer login. Tente novamente.');
    }
});

document.getElementById('logout').addEventListener('click', () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    document.getElementById('mainContent').classList.add('d-none');
    document.getElementById('loginForm').classList.remove('d-none');
    document.getElementById('login-form').reset();
});

// Verificar se já está logado
window.addEventListener('load', () => {
    const token = localStorage.getItem('token');
    if (token) {
        document.getElementById('loginForm').classList.add('d-none');
        document.getElementById('mainContent').classList.remove('d-none');
        loadEmpresas();
    }
}); 