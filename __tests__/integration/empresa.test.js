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
    it('deve listar empresas quando autenticado', async () => {
      const response = await request(app)
        .get('/api/empresas')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
      expect(response.body[0]).toHaveProperty('CNPJ');
      expect(response.body[0]).toHaveProperty('empresa');
    });

    it('deve falhar sem autenticação', async () => {
      const response = await request(app)
        .get('/api/empresas');

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('error', 'Token não fornecido');
    });

    it('deve falhar com token inválido', async () => {
      const response = await request(app)
        .get('/api/empresas')
        .set('Authorization', 'Bearer token-invalido');

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('error', 'Token inválido');
    });
  });

  describe('POST /api/empresas', () => {
    it('deve criar uma nova empresa quando autenticado', async () => {
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
      expect(response.body.empresa).toBe(novaEmpresa.empresa);
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
      expect(response.body).toHaveProperty('error', 'Empresa já cadastrada');
    });

    it('deve falhar ao criar empresa com dados inválidos', async () => {
      const response = await request(app)
        .post('/api/empresas')
        .set('Authorization', `Bearer ${token}`)
        .send({});

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });
  });

  describe('PUT /api/empresas/:id', () => {
    it('deve atualizar uma empresa existente', async () => {
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

    it('deve falhar ao atualizar empresa inexistente', async () => {
      const response = await request(app)
        .put('/api/empresas/9999')
        .set('Authorization', `Bearer ${token}`)
        .send({ empresa: 'Teste' });

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error', 'Empresa não encontrada');
    });
  });

  describe('DELETE /api/empresas/:id', () => {
    it('deve remover uma empresa existente', async () => {
      const response = await request(app)
        .delete(`/api/empresas/${empresa.id}`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(204);
    });

    it('deve falhar ao remover empresa inexistente', async () => {
      const response = await request(app)
        .delete('/api/empresas/9999')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error', 'Empresa não encontrada');
    });
  });
}); 