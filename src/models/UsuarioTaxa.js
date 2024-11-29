const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const UsuarioTaxa = sequelize.define('UsuarioTaxa', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  idUsuario: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Usuarios',
      key: 'id'
    }
  },
  idTaxa: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Taxas',
      key: 'id'
    }
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
  tableName: 'usuario_taxas',
  timestamps: true
});

module.exports = UsuarioTaxa; 