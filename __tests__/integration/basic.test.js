const request = require('supertest');
const app = require('../../src/config/app.test');

describe('Teste Básico', () => {
  it('deve responder à rota raiz', async () => {
    const response = await request(app)
      .get('/api');

    expect(response.status).toBe(200);
  });

  it('deve retornar 404 para rota inexistente', async () => {
    const response = await request(app)
      .get('/api/rota-inexistente');

    expect(response.status).toBe(404);
  });
}); 