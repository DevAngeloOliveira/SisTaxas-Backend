# SisTaxas - API de Gerenciamento de Taxas Municipais

API REST para gerenciamento de taxas municipais, desenvolvida com Node.js, Express e SQLite.

## 🚀 Tecnologias

- Node.js
- Express
- Sequelize (ORM)
- SQLite
- JWT para autenticação
- Yup para validação
- BCrypt para criptografia

## 📋 Pré-requisitos

- Node.js (versão 14 ou superior)
- NPM ou Yarn

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone [url-do-repositorio]
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor:
```bash
npm run dev
```

O servidor estará rodando em `http://localhost:5000`

## 🔑 Autenticação

A API utiliza JWT (JSON Web Token) para autenticação. Para acessar as rotas protegidas, é necessário:

1. Fazer login e obter o token
2. Incluir o token no header das requisições:
```
Authorization: Bearer [seu-token]
```

## 📚 Endpoints

### Autenticação
- **POST** `/api/login`
  ```json
  {
    "login": "seu_login",
    "senha": "sua_senha"
  }
  ```

### Empresas
- **GET** `/api/empresas` - Lista todas as empresas
- **POST** `/api/empresas` - Cria uma nova empresa
  ```json
  {
    "CNPJ": "12345678901234",
    "empresa": "Nome da Empresa"
  }
  ```
- **PUT** `/api/empresas/:id` - Atualiza uma empresa
- **DELETE** `/api/empresas/:id` - Remove uma empresa

### Usuários
- **GET** `/api/usuarios` - Lista usuários da empresa
- **POST** `/api/usuarios` - Cria um novo usuário
  ```json
  {
    "usuario": "Nome do Usuário",
    "CPF": "12345678901",
    "login": "login_usuario",
    "senha": "senha123",
    "idEmpresa": 1
  }
  ```
- **PUT** `/api/usuarios/:id` - Atualiza um usuário
- **DELETE** `/api/usuarios/:id` - Remove um usuário

### Contribuintes
- **GET** `/api/contribuintes` - Lista contribuintes da empresa
- **POST** `/api/contribuintes` - Cadastra um novo contribuinte
  ```json
  {
    "CPF": "12345678901",
    "nome": "Nome do Contribuinte",
    "idEmpresa": 1
  }
  ```
- **PUT** `/api/contribuintes/:id` - Atualiza um contribuinte
- **DELETE** `/api/contribuintes/:id` - Remove um contribuinte

### Taxas
- **GET** `/api/taxas` - Lista taxas da empresa
- **POST** `/api/taxas` - Cadastra uma nova taxa
  ```json
  {
    "codigo": "TAXA001",
    "taxa": "Nome da Taxa",
    "valor": 100.00,
    "idEmpresa": 1,
    "exercicio": 2024
  }
  ```
- **PUT** `/api/taxas/:id` - Atualiza uma taxa
- **DELETE** `/api/taxas/:id` - Remove uma taxa

### Usuário-Taxa
- **GET** `/api/usuario-taxas` - Lista relações usuário-taxa
- **POST** `/api/usuario-taxas` - Cria uma relação usuário-taxa
  ```json
  {
    "idUsuario": 1,
    "idTaxa": 1,
    "idEmpresa": 1,
    "exercicio": 2024
  }
  ```
- **DELETE** `/api/usuario-taxas/:id` - Remove uma relação

### Financeiro
- **GET** `/api/financeiro` - Lista lançamentos financeiros
- **POST** `/api/financeiro` - Cria um lançamento financeiro
  ```json
  {
    "idCPF": "12345678901",
    "vencimento": "2024-12-31",
    "descricao": "Descrição do Lançamento",
    "valor": 100.00,
    "desconto": 0,
    "codigoTaxa": "TAXA001",
    "exercicio": 2024,
    "valorTotal": 100.00,
    "codigoBarra": "123456789",
    "linhaDigitavel": "123456789",
    "usuario": 1,
    "empresa": 1
  }
  ```
- **PUT** `/api/financeiro/:id` - Atualiza um lançamento
- **DELETE** `/api/financeiro/:id` - Remove um lançamento

## 🔒 Segurança

- Todas as senhas são criptografadas usando BCrypt
- Autenticação via JWT
- Validação de dados com Yup
- Separação por empresa (multi-tenant)
- Verificações de autorização em todas as operações

## 🏗 Estrutura do Projeto

```
src/
  ├── config/
  │   └── database.js
  ├── controllers/
  │   ├── AuthController.js
  │   ├── UsuarioController.js
  │   ├── EmpresaController.js
  │   ├── ContribuinteController.js
  │   ├── TaxaController.js
  │   ├── UsuarioTaxaController.js
  │   └── FinanceiroController.js
  ├── middlewares/
  │   └── auth.js
  ├── models/
  │   ├── Usuario.js
  │   ├── Empresa.js
  │   ├── Contribuinte.js
  │   ├── Taxa.js
  │   ├── UsuarioTaxa.js
  │   ├── Financeiro.js
  │   └── index.js
  ├── routes.js
  └── app.js
```

## 🧪 Testes

Para executar os testes:
```bash
npm test
```

## 📝 Licença

Este projeto está sob a licença ISC.

## ✨ Funcionalidades

- Multi-tenant (separação por empresa)
- Autenticação e autorização
- CRUD completo para todas as entidades
- Validações de dados
- Relacionamentos entre entidades
- Gestão de taxas e contribuintes
- Controle financeiro
- Geração de códigos de barras e QR Code para pagamento 