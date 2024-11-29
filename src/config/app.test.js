const express = require('express');
const cors = require('cors');
const sequelize = require('./database.test');
const routes = require('../routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', routes);

module.exports = app; 