const { Sequelize } = require('sequelize');
const config = require('./test');

const sequelize = new Sequelize(config.database);

module.exports = sequelize; 