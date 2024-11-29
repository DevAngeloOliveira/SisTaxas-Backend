const request = require('supertest');
const app = require('../../src/config/app.test');

describe('API', () => {
  describe('GET /api', () => {
    it('deve responder com status 200', async () => {
      const response = await request(app).get('/api');
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message', 'API is running');
    });
  });

  describe('Rota inexistente', () => {
    it('deve responder com status 404', async () => {
      const response = await request(app).get('/api/nao-existe');
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error', 'Route not found');
    });

    it('deve responder com status 404 para rota protegida inexistente', async () => {
      const response = await request(app).get('/api/usuarios/999999');
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error', 'Route not found');
    });
  });
}); 