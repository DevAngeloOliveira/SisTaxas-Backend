const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Financeiro = sequelize.define('Financeiro', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  idCPF: {
    type: DataTypes.STRING,
    allowNull: false
  },
  vencimento: {
    type: DataTypes.DATE,
    allowNull: false
  },
  descricao: {
    type: DataTypes.STRING,
    allowNull: false
  },
  valor: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  desconto: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  codigoTaxa: {
    type: DataTypes.STRING,
    allowNull: false
  },
  exercicio: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  valorTotal: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  codigoBarra: {
    type: DataTypes.STRING,
    allowNull: false
  },
  linhaDigitavel: {
    type: DataTypes.STRING,
    allowNull: false
  },
  qrcode: {
    type: DataTypes.STRING,
    allowNull: true
  },
  linkPix: {
    type: DataTypes.STRING,
    allowNull: true
  },
  usuario: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Usuarios',
      key: 'id'
    }
  },
  empresa: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Empresas',
      key: 'id'
    }
  }
}, {
  tableName: 'financeiros',
  timestamps: true
});

module.exports = Financeiro; 