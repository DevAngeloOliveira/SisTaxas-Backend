const request = require('supertest');
const bcrypt = require('bcryptjs');
const app = require('../../src/config/app.test');
const { createEmpresa, createUsuario } = require('../fixtures');
const { Usuario } = require('../../src/models');

describe('Autenticação', () => {
  let empresa;
  let usuario;
  const senha = '123456';

  beforeEach(async () => {
    empresa = await createEmpresa();
    usuario = await createUsuario(empresa.id);
  });

  describe('POST /api/login', () => {
    it('deve autenticar com credenciais válidas', async () => {
      const response = await request(app)
        .post('/api/login')
        .send({
          login: usuario.login,
          senha: senha
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
      expect(response.body).toHaveProperty('error', 'Senha incorreta');
    });

    it('deve falhar com usuário inexistente', async () => {
      const response = await request(app)
        .post('/api/login')
        .send({
          login: 'usuario-inexistente',
          senha: senha
        });

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('error', 'Usuário não encontrado');
    });

    it('deve falhar com dados inválidos', async () => {
      const response = await request(app)
        .post('/api/login')
        .send({});

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });
  });
}); 