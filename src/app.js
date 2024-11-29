const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());

// Sincronizar o banco de dados
sequelize.sync({ force: false }).then(() => {
  console.log('Banco de dados sincronizado');
}).catch(err => {
  console.error('Erro ao sincronizar banco de dados:', err);
});

app.use('/api', routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app; 