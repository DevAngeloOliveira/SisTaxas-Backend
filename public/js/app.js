document.addEventListener('DOMContentLoaded', async () => {
    // Carregar dados iniciais
    if (localStorage.getItem('token')) {
        await loadEmpresas();
        await loadUsuarios();
        await loadContribuintes();
        await loadTaxas();
    }

    // Configurar eventos das tabs
    const tabs = document.querySelectorAll('button[data-bs-toggle="tab"]');
    tabs.forEach(tab => {
        tab.addEventListener('shown.bs.tab', async (e) => {
            const target = e.target.getAttribute('data-bs-target');
            switch (target) {
                case '#empresasTab':
                    await loadEmpresas();
                    break;
                case '#usuariosTab':
                    await loadUsuarios();
                    break;
                case '#contribuintesTab':
                    await loadContribuintes();
                    break;
                case '#taxasTab':
                    await loadTaxas();
                    break;
            }
        });
    });

    // Configurar formulários
    const forms = {
        empresa: document.getElementById('empresaForm'),
        usuario: document.getElementById('usuarioForm'),
        contribuinte: document.getElementById('contribuinteForm'),
        taxa: document.getElementById('taxaForm')
    };

    // Empresa Form
    if (forms.empresa) {
        forms.empresa.addEventListener('submit', handleEmpresaSubmit);
    }

    // Usuario Form
    if (forms.usuario) {
        forms.usuario.addEventListener('submit', handleUsuarioSubmit);
    }

    // Contribuinte Form
    if (forms.contribuinte) {
        forms.contribuinte.addEventListener('submit', handleContribuinteSubmit);
    }

    // Taxa Form
    if (forms.taxa) {
        forms.taxa.addEventListener('submit', handleTaxaSubmit);
    }

    // Configurar modals
    window.modals = {
        empresa: new bootstrap.Modal(document.getElementById('empresaModal')),
        usuario: new bootstrap.Modal(document.getElementById('usuarioModal')),
        contribuinte: new bootstrap.Modal(document.getElementById('contribuinteModal')),
        taxa: new bootstrap.Modal(document.getElementById('taxaModal'))
    };
}); 