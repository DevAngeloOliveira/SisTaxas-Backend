const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Contribuinte = sequelize.define('Contribuinte', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  CPF: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  idEmpresa: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Empresas',
      key: 'id'
    }
  }
}, {
  tableName: 'contribuintes',
  timestamps: true
});

module.exports = Contribuinte; 