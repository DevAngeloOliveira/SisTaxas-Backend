const Usuario = require('./Usuario');
const Empresa = require('./Empresa');
const Contribuinte = require('./Contribuinte');
const Taxa = require('./Taxa');
const UsuarioTaxa = require('./UsuarioTaxa');
const Financeiro = require('./Financeiro');

// Definindo as associações
Empresa.hasMany(Usuario, { foreignKey: 'idEmpresa' });
Usuario.belongsTo(Empresa, { foreignKey: 'idEmpresa' });

Empresa.hasMany(Contribuinte, { foreignKey: 'idEmpresa' });
Contribuinte.belongsTo(Empresa, { foreignKey: 'idEmpresa' });

Empresa.hasMany(Taxa, { foreignKey: 'idEmpresa' });
Taxa.belongsTo(Empresa, { foreignKey: 'idEmpresa' });

Usuario.belongsToMany(Taxa, { through: UsuarioTaxa, foreignKey: 'idUsuario' });
Taxa.belongsToMany(Usuario, { through: UsuarioTaxa, foreignKey: 'idTaxa' });

Usuario.hasMany(Financeiro, { foreignKey: 'usuario' });
Financeiro.belongsTo(Usuario, { foreignKey: 'usuario' });

Empresa.hasMany(Financeiro, { foreignKey: 'empresa' });
Financeiro.belongsTo(Empresa, { foreignKey: 'empresa' });

module.exports = {
  Usuario,
  Empresa,
  Contribuinte,
  Taxa,
  UsuarioTaxa,
  Financeiro
}; 