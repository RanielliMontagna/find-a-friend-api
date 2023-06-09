<h1 align="center">Find a Friend API</h1>

<p align="center">
  <a href="#-sobre">Sobre</a>
  &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-rotas">Rotas</a>
  &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-tecnologias">Tecnologias</a>
  &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-como-executar">Como executar</a>
  &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-testes">Testes</a>
</p>

## 📖 Sobre

<p id="-sobre" />

O projeto é uma API para a adoção de animais, utilizando princípios SOLID e Clean Architecture.
Além disso, o projeto é totalmete orientado a testes, utilizando testes unitários e de integração.

### 📌 Regras da aplicação

- [x] Deve ser possível cadastrar um pet
- [x] Deve ser possível listar todos os pets disponíveis para adoção em uma cidade
- [x] Deve ser possível filtrar pets por suas características
- [x] Deve ser possível visualizar detalhes de um pet para adoção
- [x] Deve ser possível se cadastrar como uma ORG
- [x] Deve ser possível realizar login como uma ORG

### 📌 Regras de negócio

- [x] Para listar os pets, obrigatoriamente precisamos informar a cidade
- [x] Uma ORG precisa ter um endereço e um número de WhatsApp
- [x] Um pet deve estar ligado a uma ORG
- [x] O usuário que quer adotar, entrará em contato com a ORG via WhatsApp
- [x] Todos os filtros, além da cidade, são opcionais
- [x] Para uma ORG acessar a aplicação como admin, ela precisa estar logada

## 🛣️ Rotas

<p id="-rotas" />

| Método  | Rota             | Descrição                 |
| ------- | ---------------- | ------------------------- |
| `POST`  | `/orgs`          | Cria uma org              |
| `POST`  | `/sessions`      | Autentica uma org         |
| `PATCH` | `/token/refresh` | Atualiza o token da org   |
| ------- | ---------------- | -----------------------   |
| `POST`  | `/pets`          | Registrar um pet          |
| `GET`   | `/pets/search`   | Buscar pets               |
| `GET`   | `/pets/:id`      | Buscar detalhes de um pet |

## 🚀 Tecnologias

<p id="-tecnologias" />

- [Node.js](https://nodejs.org/en/) - Interpretador de JavaScript para construção do servidor;
- [Fastify](https://www.fastify.io/) - Framework para construção de APIs;
- [TypeScript](https://www.typescriptlang.org/) - Superset JavaScript;
- [Prisma](https://www.prisma.io/) - ORM para banco de dados;
- [PostgreSQL](https://www.postgresql.org/) - Banco de dados relacional;
- [Docker](https://www.docker.com/) - Container para banco de dados;
- [Vitest](https://vitest.dev/) - Test Runner para TypeScript;
- [Supertest](https://www.npmjs.com/package/supertest) - Biblioteca para testes de integração;
- [BCrypt](https://www.npmjs.com/package/bcrypt) - Biblioteca para criptografia de senhas;
- [Zod](https://www.npmjs.com/package/zod) - Biblioteca para validação de dados;

## 📦 Como executar

<p id="-como-executar" />

### 🎲 Instalação

```bash
# Clone o repositório
$ git clone

# Acesse a pasta do projeto
$ cd find-a-friend-api

# Instale as dependências
$ npm install
```

### ⚙️ Configuração

```bash
# Crie um arquivo .env na raiz do projeto
$ touch .env

# Copie o conteúdo do arquivo .env.example para o arquivo .env
$ cp .env.example .env

# Preencha as variáveis de ambiente
$ vim .env

# Crie o banco de dados no docker
$ docker-compose up -d

# Execute as migrations
$ npm run prisma migrate dev
```

### ⚡ Execução

```bash

# Execute o projeto
$ npm run dev

# Por padrão, o projeto estará disponível em http://localhost:3000
```

## 🧪 Testes

<p id="-testes" />

### ❇️ Testes Unitários

```bash
# Execute os testes unitários
$ npm run test

# Execute os testes unitários com coverage
$ npm run test:coverage
```

### ❇️ Testes de Integração

```bash
# Execute os testes de integração
$ npm run test:e2e
```

### 🖊️ Autor - [@raniellimontagna](https://www.github.com/raniellimontagna)
