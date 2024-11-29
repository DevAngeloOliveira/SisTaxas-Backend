const sequelize = require('../src/config/database.test');
const { Empresa, Usuario, Contribuinte, Taxa, UsuarioTaxa, Financeiro } = require('../src/models');

beforeAll(async () => {
  try {
    // Sincroniza o banco de dados de teste
    await sequelize.sync({ force: true });
    console.log('Banco de dados sincronizado com sucesso');
  } catch (error) {
    console.error('Erro ao sincronizar banco de dados:', error);
    throw error;
  }
});

beforeEach(async () => {
  try {
    // Limpa todas as tabelas antes de cada teste
    await Promise.all([
      Empresa.destroy({ truncate: true, cascade: true }),
      Usuario.destroy({ truncate: true, cascade: true }),
      Contribuinte.destroy({ truncate: true, cascade: true }),
      Taxa.destroy({ truncate: true, cascade: true }),
      UsuarioTaxa.destroy({ truncate: true, cascade: true }),
      Financeiro.destroy({ truncate: true, cascade: true })
    ]);
    console.log('Tabelas limpas com sucesso');
  } catch (error) {
    console.error('Erro ao limpar tabelas:', error);
    throw error;
  }
});

afterAll(async () => {
  try {
    // Fecha a conexão com o banco de dados
    await sequelize.close();
    console.log('Conexão com o banco de dados fechada');
  } catch (error) {
    console.error('Erro ao fechar conexão:', error);
    throw error;
  }
}); 