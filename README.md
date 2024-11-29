# SisTaxas

Sistema completo de gerenciamento de taxas municipais.

## 🚀 Tecnologias

### Backend
- Node.js
- Express
- Sequelize (ORM)
- SQLite
- JWT para autenticação
- Yup para validação
- BCrypt para criptografia

### Frontend
- HTML5
- CSS3 com Bootstrap 5
- JavaScript (ES6+)
- Bootstrap Icons
- Layout responsivo

## 📋 Pré-requisitos

- Node.js (versão 14 ou superior)
- NPM ou Yarn
- Navegador moderno com suporte a ES6+

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone [https://github.com/DevAngeloOliveira/SisTaxas-Backend]
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

## ✨ Funcionalidades

### Autenticação
- Login seguro com JWT
- Proteção de rotas
- Gerenciamento de sessão
- Logout automático

### Interface do Usuário
- Design moderno e responsivo
- Tema personalizado com cores da Eticons
- Navegação intuitiva por abas
- Feedback visual para todas as ações
- Contadores automáticos de registros
- Formulários com validação em tempo real

### Empresas
- Cadastro e gerenciamento de empresas
- Listagem com busca e ordenação
- CRUD completo com validações
- Associação automática com usuários

### Usuários
- Gerenciamento de usuários por empresa
- Controle de acesso e permissões
- Senhas criptografadas
- Validação de CPF e dados pessoais

### Contribuintes
- Cadastro completo de contribuintes
- Vinculação com empresa
- Validação de documentos
- Histórico de taxas e pagamentos

### Taxas
- Cadastro e configuração de taxas
- Definição de valores e exercícios
- Vinculação com empresas e usuários
- Geração automática de códigos

### Financeiro
- Lançamentos financeiros
- Controle de vencimentos
- Cálculo automático de valores
- Geração de códigos de barras
- Relatórios e extratos

### Segurança
- Todas as senhas são criptografadas usando BCrypt
- Autenticação via JWT
- Validação de dados com Yup
- Separação por empresa (multi-tenant)
- Verificações de autorização em todas as operações

### Interface Responsiva
- Layout adaptável a diferentes dispositivos
- Menus colapsáveis
- Tabelas responsivas
- Formulários otimizados para mobile

### Experiência do Usuário
- Mensagens de feedback para todas as ações
- Confirmações antes de exclusões
- Indicadores de carregamento
- Contadores automáticos
- Formulários inteligentes com autopreenchimento
- Validações em tempo real

## 🏗 Estrutura do Projeto

```
src/
  ├── backend/
  │   ├── config/
  │   ├── controllers/
  │   ├── middlewares/
  │   ├── models/
  │   ├── routes.js
  │   └── app.js
  │
  └── public/
      ├── css/
      │   └── styles.css
      ├── js/
      │   ├── api.js
      │   ├── auth.js
      │   ├── app.js
      │   └── handlers/
      │       ├── empresa.js
      │       ├── usuario.js
      │       ├── contribuinte.js
      │       └── taxa.js
      └── index.html
```

## 🧪 Testes

Para executar os testes:
```bash
npm test
```

## 📝 Licença

Este projeto está sob a licença ISC.
