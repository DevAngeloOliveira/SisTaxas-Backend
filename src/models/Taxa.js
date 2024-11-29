const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Taxa = sequelize.define('Taxa', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  codigo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  taxa: {
    type: DataTypes.STRING,
    allowNull: false
  },
  valor: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  idEmpresa: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Empresas',
      key: 'id'
    }
  },
  exercicio: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'taxas',
  timestamps: true
});

module.exports = Taxa; 