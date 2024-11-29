const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Empresa = sequelize.define('Empresa', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  CNPJ: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  empresa: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'empresas',
  timestamps: true
});

module.exports = Empresa; 