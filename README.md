# App Financeiro 💵💰💳

Consiste em uma aplicação full-stack dockerizada, com design responsivo, para realização de transferências monetárias entre usuários cadastrados na plataforma.

### BackEnd:

* Construído com Node.js, Express, Typescript, Sequelize, Postgres e Docker
* Utilizando os princípios SOLID e Programação Orientada a Objetos
* Aplicando Arquitetura de Software, com as camadas de Modelo, Serviço e de Controladores
* Testes de integração realizados com Mocha, Chai e Sinon
* Endpoints: _[acessar](https://github.com/guilherme-ac-fernandes/ng-financial-app/tree/main/backend)_

### FrontEnd:
* Construído com React, React Hooks, Typescript, Bootstrap, React-Bootstrap e CSS
* Páginas: _[acessar](https://github.com/guilherme-ac-fernandes/ng-financial-app/tree/main/frontend)_

### Instruções

- Para rodar a aplicação localmente e os testes do backend, realize o clone do projeto e utilize os comandos a seguir:

```
Para clonar o projeto:
git clone git@github.com:guilherme-ac-fernandes/ng-financial-app.git

Para rodar a aplicação dockerizada, instalar as dependências e iniciar as aplicações:
<-- na raiz do projeto -->
npm run compose:up // para subir o docker-compose
npm run back:acess // para acessar o container do backend
npm run db:migrate // para criar as tabelas e popular no banco de caso

<-- caso o banco de dados não exista ainda -->
npm run db:reset // para criar o banco de dados

Para parar a aplicação dockerizada:
<-- na raiz do projeto -->
npm run compose:down // para parar os containers

Para rodar o testes do BackEnd:
<-- na raiz do projeto -->
npm run back:acess
npm test // para rodar o teste simplificado
npm run test:coverage // para avaliar a cobertura dos testes
exit // para sair do container do backend
```
<br />

<details>
  <summary><strong>A aplicação já contém alguns usuários criados:</strong></summary><br />
  
 | Usuário | Senha |
|---|---|
| `barneystinson` | len123Gen |
| `lilipad` | Pillow1234 |
| `tmosby` | MosbyT789 |
| `robin` | ScherCanada1 |
| `marshall` | juDge1000 |
| `themom` | momThe1234 |
 
</details>

### Demonstração

<br />
<p align="center">
  <img src="https://github.com/guilherme-ac-fernandes/ng-financial-app/blob/main/images/transactions.png" alt="NG_Cash Página Inicial - Demostração"/>
</p>
