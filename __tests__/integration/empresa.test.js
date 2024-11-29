const request = require('supertest');
const app = require('../../src/config/app.test');
const { createEmpresa, createUsuario, generateToken } = require('../fixtures');

describe('Empresas', () => {
  let empresa;
  let usuario;
  let token;

  beforeEach(async () => {
    empresa = await createEmpresa();
    usuario = await createUsuario(empresa.id);
    token = generateToken(usuario);
  });

  describe('GET /api/empresas', () => {
    it('deve listar empresas', async () => {
      const response = await request(app)
        .get('/api/empresas')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });

    it('deve falhar sem autenticação', async () => {
      const response = await request(app)
        .get('/api/empresas');

      expect(response.status).toBe(401);
    });
  });

  describe('POST /api/empresas', () => {
    it('deve criar uma nova empresa', async () => {
      const novaEmpresa = {
        CNPJ: '12345678901234',
        empresa: 'Empresa Teste'
      };

      const response = await request(app)
        .post('/api/empresas')
        .set('Authorization', `Bearer ${token}`)
        .send(novaEmpresa);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.CNPJ).toBe(novaEmpresa.CNPJ);
    });

    it('deve falhar ao criar empresa com CNPJ duplicado', async () => {
      const novaEmpresa = {
        CNPJ: empresa.CNPJ,
        empresa: 'Empresa Teste'
      };

      const response = await request(app)
        .post('/api/empresas')
        .set('Authorization', `Bearer ${token}`)
        .send(novaEmpresa);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });
  });

  describe('PUT /api/empresas/:id', () => {
    it('deve atualizar uma empresa', async () => {
      const dadosAtualizados = {
        empresa: 'Empresa Atualizada'
      };

      const response = await request(app)
        .put(`/api/empresas/${empresa.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send(dadosAtualizados);

      expect(response.status).toBe(200);
      expect(response.body.empresa).toBe(dadosAtualizados.empresa);
    });
  });

  describe('DELETE /api/empresas/:id', () => {
    it('deve remover uma empresa', async () => {
      const response = await request(app)
        .delete(`/api/empresas/${empresa.id}`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(204);
    });
  });
}); 