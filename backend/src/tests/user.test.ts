import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../api/app';

// Models
import UserModel from '../models/UserModel';
import AccountModel from '../models/AccountModel';

// Mocks
import { ACCOUNT_USER_1 } from './mocks/account.mock';
import {
  ALL_USERS,
  ALL_USERS_EXCLUDE_FIELDS,
  CREATE_USER_1,
} from './mocks/user.mock';
import {
  VALID_TOKEN_USER_1,
  VALID_TOKEN_USER_2,
} from './mocks/token.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Rota de Usuário', () => {
  describe('Rota POST /register', () => {
    before(async () => {
      sinon.stub(UserModel.prototype, 'create').resolves(CREATE_USER_1);
      sinon.stub(AccountModel.prototype, 'create').resolves(ACCOUNT_USER_1);
      sinon.stub(UserModel.prototype, 'findByUsername').resolves(null);
    });
    after(() => {
      (UserModel.prototype.create as sinon.SinonStub).restore();
      (AccountModel.prototype.create as sinon.SinonStub).restore();
      (UserModel.prototype.findByUsername as sinon.SinonStub).restore();
    });

    it('Caso de sucesso', async () => {
      const result = await chai
        .request(app)
        .post('/register')
        .set('authorization', VALID_TOKEN_USER_1)
        .send({
          username: 'barneystinson',
          password: 'len123Gen',
        });
      expect(result.status).to.be.equal(201);
      expect(result.body).to.have.property('token');
      expect(result.body).to.have.property('accountId');
      expect(result.body).to.have.property('username');
    });
  });

  describe('Rota POST /register', () => {
    before(async () => {
      sinon.stub(UserModel.prototype, 'create').rejects();
      sinon.stub(AccountModel.prototype, 'create').resolves(ACCOUNT_USER_1);
      sinon
        .stub(UserModel.prototype, 'findByUsername')
        .onFirstCall()
        .resolves(CREATE_USER_1)
        .onSecondCall()
        .resolves(null);
    });
    after(() => {
      (UserModel.prototype.create as sinon.SinonStub).restore();
      (AccountModel.prototype.create as sinon.SinonStub).restore();
      (UserModel.prototype.findByUsername as sinon.SinonStub).restore();
    });

    it('Caso de falha - username inválido', async () => {
      const result = await chai
        .request(app)
        .post('/register')
        .set('authorization', VALID_TOKEN_USER_1)
        .send({
          username: '',
          password: 'len123Gen',
        });

      expect(result.status).to.be.equal(400);
      expect(result.body.message).to.be.equal('Invalid username');
    });

    it('Caso de falha - username menor de 3 caracteres', async () => {
      const result = await chai
        .request(app)
        .post('/register')
        .set('authorization', VALID_TOKEN_USER_1)
        .send({
          username: 'ba',
          password: 'len123Gen',
        });

      expect(result.status).to.be.equal(400);
      expect(result.body.message).to.be.equal('Invalid username');
    });

    it('Caso de falha - username inválido', async () => {
      const result = await chai
        .request(app)
        .post('/register')
        .set('authorization', VALID_TOKEN_USER_1)
        .send({
          username: 'barneystinson',
          password: 'len123gen',
        });

      expect(result.status).to.be.equal(400);
      expect(result.body.message).to.be.equal('Invalid password');
    });

    it('Caso de falha - usuário já existe', async () => {
      const result = await chai
        .request(app)
        .post('/register')
        .set('authorization', VALID_TOKEN_USER_1)
        .send({
          username: 'barneystinson',
          password: 'len123Gen',
        });

      expect(result.status).to.be.equal(400);
      expect(result.body.message).to.be.equal('Username already exists');
    });

    it('Caso de falha - erro na criação', async () => {
      const result = await chai
        .request(app)
        .post('/register')
        .set('authorization', VALID_TOKEN_USER_1)
        .send({
          username: 'barneystinson',
          password: 'len123Gen',
        });

      expect(result.status).to.be.equal(500);
      expect(result.body.message).to.be.equal('Internal server error');
    });
  });

  describe('Rota POST /login', () => {
    before(async () =>
      sinon.stub(UserModel.prototype, 'findByUsername').resolves(CREATE_USER_1)
    );
    after(() =>
      (UserModel.prototype.findByUsername as sinon.SinonStub).restore()
    );

    it('Caso de sucesso', async () => {
      const result = await chai.request(app).post('/login').send({
        username: 'barneystinson',
        password: 'len123Gen',
      });

      expect(result.status).to.be.equal(200);
      expect(result.body).to.have.property('token');
      expect(result.body).to.have.property('accountId');
      expect(result.body).to.have.property('username');
    });
  });

  describe('Rota POST /login', () => {
    before(async () =>
      sinon.stub(UserModel.prototype, 'findByUsername').resolves(null)
    );
    after(() =>
      (UserModel.prototype.findByUsername as sinon.SinonStub).restore()
    );

    it('Caso de falha - usuário não existe', async () => {
      const result = await chai.request(app).post('/login').send({
        username: 'barneystinson',
        password: 'len123Gen',
      });

      expect(result.status).to.be.equal(401);
      expect(result.body.message).to.be.equal('Incorrect username or password');
    });
  });

  describe('Rota GET /user', () => {
    before(async () =>
      sinon.stub(UserModel.prototype, 'findAll').resolves(ALL_USERS)
    );
    after(() => (UserModel.prototype.findAll as sinon.SinonStub).restore());

    it('Caso de sucesso - Usuário 1', async () => {
      const result = await chai
        .request(app)
        .get('/user')
        .set('authorization', VALID_TOKEN_USER_1);

      const filterResponse = ALL_USERS_EXCLUDE_FIELDS.filter(
        (item) => item.accountId !== 1
      );
      expect(result.status).to.be.equal(200);
      expect(result.body).to.be.a('array');
      expect(result.body).to.be.deep.equal(filterResponse);
    });

    it('Caso de sucesso - Usuário 2', async () => {
      const result = await chai
        .request(app)
        .get('/user')
        .set('authorization', VALID_TOKEN_USER_2);

      const filterResponse = ALL_USERS_EXCLUDE_FIELDS.filter(
        (item) => item.accountId !== 2
      );
      expect(result.status).to.be.equal(200);
      expect(result.body).to.be.a('array');
      expect(result.body).to.be.deep.equal(filterResponse);
    });
  });

  describe('Rota POST /login', () => {
    before(async () =>
      sinon.stub(UserModel.prototype, 'findAll').resolves(null)
    );
    after(() => (UserModel.prototype.findAll as sinon.SinonStub).restore());

    it('Caso de falha - usuário não existe', async () => {
      const result = await chai
        .request(app)
        .get('/user')
        .set('authorization', VALID_TOKEN_USER_1);

      expect(result.status).to.be.equal(404);
      expect(result.body.message).to.be.equal('Users not found');
    });
  });
});
