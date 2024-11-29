const { Router } = require('express');
const AuthController = require('./controllers/AuthController');
const UsuarioController = require('./controllers/UsuarioController');
const EmpresaController = require('./controllers/EmpresaController');
const ContribuinteController = require('./controllers/ContribuinteController');
const TaxaController = require('./controllers/TaxaController');
const UsuarioTaxaController = require('./controllers/UsuarioTaxaController');
const FinanceiroController = require('./controllers/FinanceiroController');
const authMiddleware = require('./middlewares/auth');

const routes = new Router();

// Rotas públicas
routes.post('/login', AuthController.login);

// Middleware de autenticação
routes.use(authMiddleware);

// Rotas protegidas
// Usuários
routes.get('/usuarios', UsuarioController.index);
routes.post('/usuarios', UsuarioController.store);
routes.put('/usuarios/:id', UsuarioController.update);
routes.delete('/usuarios/:id', UsuarioController.delete);

// Empresas
routes.get('/empresas', EmpresaController.index);
routes.post('/empresas', EmpresaController.store);
routes.put('/empresas/:id', EmpresaController.update);
routes.delete('/empresas/:id', EmpresaController.delete);

// Contribuintes
routes.get('/contribuintes', ContribuinteController.index);
routes.post('/contribuintes', ContribuinteController.store);
routes.put('/contribuintes/:id', ContribuinteController.update);
routes.delete('/contribuintes/:id', ContribuinteController.delete);

// Taxas
routes.get('/taxas', TaxaController.index);
routes.post('/taxas', TaxaController.store);
routes.put('/taxas/:id', TaxaController.update);
routes.delete('/taxas/:id', TaxaController.delete);

// Usuário-Taxa
routes.get('/usuario-taxas', UsuarioTaxaController.index);
routes.post('/usuario-taxas', UsuarioTaxaController.store);
routes.delete('/usuario-taxas/:id', UsuarioTaxaController.delete);

// Financeiro
routes.get('/financeiro', FinanceiroController.index);
routes.post('/financeiro', FinanceiroController.store);
routes.put('/financeiro/:id', FinanceiroController.update);
routes.delete('/financeiro/:id', FinanceiroController.delete);

module.exports = routes; 