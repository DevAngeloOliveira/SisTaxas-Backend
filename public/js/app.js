// Navegação
function initNavigation() {
    document.querySelectorAll('.nav-link[data-page]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = e.target.dataset.page;
            showPage(page);
        });
    });
}

function showPage(page) {
    // Esconder todas as páginas
    document.querySelectorAll('.content-page').forEach(p => {
        p.classList.add('d-none');
    });

    // Mostrar a página selecionada
    document.getElementById(`${page}Page`).classList.remove('d-none');

    // Carregar dados da página
    switch (page) {
        case 'empresas':
            loadEmpresas();
            break;
        case 'usuarios':
            loadUsuarios();
            break;
        case 'contribuintes':
            loadContribuintes();
            break;
        case 'taxas':
            loadTaxas();
            break;
    }
}

// Função para atualizar selects de empresa
function updateEmpresaSelect(selectId) {
    const select = document.getElementById(selectId);
    if (select && window.empresas) {
        select.innerHTML = window.empresas.map(empresa => 
            `<option value="${empresa.id}">${empresa.empresa}</option>`
        ).join('');
    }
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar navegação
    initNavigation();

    // Inicializar modais
    const modalTypes = ['empresa', 'usuario', 'contribuinte', 'taxa'];
    
    // Criar instâncias dos modais
    window.modals = modalTypes.reduce((acc, type) => {
        const modalElement = document.getElementById(`${type}Modal`);
        if (modalElement) {
            acc[type] = new bootstrap.Modal(modalElement, {
                backdrop: 'static',
                keyboard: false
            });
        }
        return acc;
    }, {});

    // Configurar eventos dos modais
    modalTypes.forEach(type => {
        const modalElement = document.getElementById(`${type}Modal`);
        const form = document.getElementById(`${type}Form`);
        
        if (modalElement && form) {
            const firstInput = form.querySelector('input:not([type="hidden"])');

            // Quando o modal abrir, focar no primeiro campo
            modalElement.addEventListener('shown.bs.modal', () => {
                if (firstInput) firstInput.focus();
            });

            // Quando o modal fechar, limpar o formulário
            modalElement.addEventListener('hidden.bs.modal', () => {
                form.reset();
                const idInput = form.querySelector('input[type="hidden"]');
                if (idInput) idInput.value = '';
            });

            // Antes de fechar o modal, remover o foco
            modalElement.addEventListener('hide.bs.modal', () => {
                if (document.activeElement) document.activeElement.blur();
            });
        }
    });

    // Verificar autenticação e mostrar conteúdo principal
    const token = localStorage.getItem('token');
    if (token) {
        document.getElementById('loginForm').classList.add('d-none');
        document.getElementById('mainContent').classList.remove('d-none');
        loadEmpresas();
    }
}); 