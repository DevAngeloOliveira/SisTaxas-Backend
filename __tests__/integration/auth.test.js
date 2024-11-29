const request = require('supertest');
const app = require('../../src/config/app.test');
const { createEmpresa, createUsuario } = require('../fixtures');

describe('Autenticação', () => {
  let empresa;
  let usuario;

  beforeEach(async () => {
    empresa = await createEmpresa();
    usuario = await createUsuario(empresa.id);
  });

  it('deve autenticar com credenciais válidas', async () => {
    const response = await request(app)
      .post('/api/login')
      .send({
        login: usuario.login,
        senha: '123456'
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
    expect(response.body.usuario).toHaveProperty('id');
    expect(response.body.usuario.idEmpresa).toBe(empresa.id);
  });

  it('deve falhar com senha incorreta', async () => {
    const response = await request(app)
      .post('/api/login')
      .send({
        login: usuario.login,
        senha: 'senha-errada'
      });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('error');
  });

  it('deve falhar com usuário inexistente', async () => {
    const response = await request(app)
      .post('/api/login')
      .send({
        login: 'usuario-inexistente',
        senha: '123456'
      });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('error');
  });
}); 