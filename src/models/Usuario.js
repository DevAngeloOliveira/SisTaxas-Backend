const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Usuario = sequelize.define('Usuario', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  usuario: {
    type: DataTypes.STRING,
    allowNull: false
  },
  CPF: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  login: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  senha: {
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
  tableName: 'usuarios',
  timestamps: true
});

module.exports = Usuario; 