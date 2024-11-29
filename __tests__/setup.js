require('dotenv').config({ path: '.env.test' });
const sequelize = require('../src/config/database.test');
const { Empresa, Usuario, Contribuinte, Taxa, UsuarioTaxa, Financeiro } = require('../src/models');

beforeAll(async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
    
    await sequelize.sync({ force: true });
    console.log('Banco de dados sincronizado com sucesso');
  } catch (error) {
    console.error('Erro ao configurar banco de dados:', error);
    throw error;
  }
});

beforeEach(async () => {
  try {
    await Promise.all([
      Empresa.destroy({ truncate: { cascade: true } }),
      Usuario.destroy({ truncate: { cascade: true } }),
      Contribuinte.destroy({ truncate: { cascade: true } }),
      Taxa.destroy({ truncate: { cascade: true } }),
      UsuarioTaxa.destroy({ truncate: { cascade: true } }),
      Financeiro.destroy({ truncate: { cascade: true } })
    ]);
    console.log('Tabelas limpas com sucesso');
  } catch (error) {
    console.error('Erro ao limpar tabelas:', error);
    throw error;
  }
});

afterEach(async () => {
  await sequelize.query('PRAGMA foreign_keys = OFF;');
  for (const Model of [Empresa, Usuario, Contribuinte, Taxa, UsuarioTaxa, Financeiro]) {
    await Model.destroy({ truncate: true, force: true });
  }
  await sequelize.query('PRAGMA foreign_keys = ON;');
});

afterAll(async () => {
  try {
    await sequelize.close();
    console.log('Conexão com o banco de dados fechada');
  } catch (error) {
    console.error('Erro ao fechar conexão:', error);
    throw error;
  }
}); 