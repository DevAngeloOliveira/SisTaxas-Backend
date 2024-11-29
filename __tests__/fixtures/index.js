const { faker } = require('@faker-js/faker');
const bcrypt = require('bcryptjs');
const { Empresa, Usuario, Contribuinte, Taxa, UsuarioTaxa, Financeiro } = require('../../src/models');

const createEmpresa = async () => {
  return await Empresa.create({
    CNPJ: faker.string.numeric(14),
    empresa: faker.company.name()
  });
};

const createUsuario = async (idEmpresa) => {
  return await Usuario.create({
    usuario: faker.person.fullName(),
    CPF: faker.string.numeric(11),
    login: faker.internet.username(),
    senha: await bcrypt.hash('123456', 8),
    idEmpresa
  });
};

const createContribuinte = async (idEmpresa) => {
  return await Contribuinte.create({
    CPF: faker.string.numeric(11),
    nome: faker.person.fullName(),
    idEmpresa
  });
};

const createTaxa = async (idEmpresa) => {
  return await Taxa.create({
    codigo: faker.string.alphanumeric(6).toUpperCase(),
    taxa: faker.commerce.productName(),
    valor: parseFloat(faker.commerce.price()),
    idEmpresa,
    exercicio: new Date().getFullYear()
  });
};

const createUsuarioTaxa = async (idUsuario, idTaxa, idEmpresa) => {
  return await UsuarioTaxa.create({
    idUsuario,
    idTaxa,
    idEmpresa,
    exercicio: new Date().getFullYear()
  });
};

const createFinanceiro = async (idCPF, usuario, empresa) => {
  return await Financeiro.create({
    idCPF,
    vencimento: faker.date.future(),
    descricao: faker.lorem.sentence(),
    valor: parseFloat(faker.commerce.price()),
    desconto: 0,
    codigoTaxa: faker.string.alphanumeric(6).toUpperCase(),
    exercicio: new Date().getFullYear(),
    valorTotal: parseFloat(faker.commerce.price()),
    codigoBarra: faker.string.numeric(48),
    linhaDigitavel: faker.string.numeric(48),
    qrcode: faker.internet.url(),
    linkPix: faker.internet.url(),
    usuario,
    empresa
  });
};

const generateToken = (usuario) => {
  const jwt = require('jsonwebtoken');
  return jwt.sign(
    { id: usuario.id, idEmpresa: usuario.idEmpresa },
    process.env.JWT_SECRET || 'sistaxas2024',
    { expiresIn: '1d' }
  );
};

module.exports = {
  createEmpresa,
  createUsuario,
  createContribuinte,
  createTaxa,
  createUsuarioTaxa,
  createFinanceiro,
  generateToken
}; 