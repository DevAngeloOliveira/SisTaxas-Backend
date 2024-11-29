const bcrypt = require('bcryptjs');
const { Empresa, Usuario } = require('../src/models');
const sequelize = require('../src/config/database');

async function seed() {
    try {
        // Sincronizar o banco de dados
        await sequelize.sync({ force: true });

        // Criar empresa teste
        const empresa = await Empresa.create({
            CNPJ: '00000000000191',
            empresa: 'Empresa Teste'
        });

        // Criar usuário administrador
        const usuario = await Usuario.create({
            usuario: 'Administrador',
            CPF: '00000000000',
            login: 'admin',
            senha: await bcrypt.hash('admin', 8),
            idEmpresa: empresa.id
        });

        console.log('Dados de teste criados com sucesso!');
        console.log('Credenciais de acesso:');
        console.log('Login: admin');
        console.log('Senha: admin');

        process.exit(0);
    } catch (error) {
        console.error('Erro ao criar dados de teste:', error);
        process.exit(1);
    }
}

seed(); 