const express = require('express');
const cors = require('cors');
const routes = require('../routes');

const app = express();

app.use(cors());
app.use(express.json());

// Rota raiz para teste básico
app.get('/api', (req, res) => {
  res.status(200).json({ message: 'API is running' });
});

// Rotas da API
app.use('/api', routes);

// Middleware para rotas não encontradas
app.use('/api/*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

module.exports = app; 