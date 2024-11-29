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

// Rotas protegidas
// Usuários
routes.get('/usuarios', authMiddleware, UsuarioController.index);
routes.post('/usuarios', authMiddleware, UsuarioController.store);
routes.put('/usuarios/:id', authMiddleware, UsuarioController.update);
routes.delete('/usuarios/:id', authMiddleware, UsuarioController.delete);

// Empresas
routes.get('/empresas', authMiddleware, EmpresaController.index);
routes.post('/empresas', authMiddleware, EmpresaController.store);
routes.put('/empresas/:id', authMiddleware, EmpresaController.update);
routes.delete('/empresas/:id', authMiddleware, EmpresaController.delete);

// Contribuintes
routes.get('/contribuintes', authMiddleware, ContribuinteController.index);
routes.post('/contribuintes', authMiddleware, ContribuinteController.store);
routes.put('/contribuintes/:id', authMiddleware, ContribuinteController.update);
routes.delete('/contribuintes/:id', authMiddleware, ContribuinteController.delete);

// Taxas
routes.get('/taxas', authMiddleware, TaxaController.index);
routes.post('/taxas', authMiddleware, TaxaController.store);
routes.put('/taxas/:id', authMiddleware, TaxaController.update);
routes.delete('/taxas/:id', authMiddleware, TaxaController.delete);

// Usuário-Taxa
routes.get('/usuario-taxas', authMiddleware, UsuarioTaxaController.index);
routes.post('/usuario-taxas', authMiddleware, UsuarioTaxaController.store);
routes.delete('/usuario-taxas/:id', authMiddleware, UsuarioTaxaController.delete);

// Financeiro
routes.get('/financeiro', authMiddleware, FinanceiroController.index);
routes.post('/financeiro', authMiddleware, FinanceiroController.store);
routes.put('/financeiro/:id', authMiddleware, FinanceiroController.update);
routes.delete('/financeiro/:id', authMiddleware, FinanceiroController.delete);

module.exports = routes; 