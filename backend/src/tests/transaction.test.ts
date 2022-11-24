import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../api/app';

// Model
import AccountModel from '../models/AccountModel';
import TransactionModel from '../models/TransactionModel';

// Mocks
import { ACCOUNT_USER_1, ACCOUNT_USER_2 } from './mocks/account.mock';
import { VALID_TOKEN_USER_1 } from './mocks/token.mock';
import { ALL_TRANSACTION, TRANSACTION_CREATED } from './mocks/transaction.mock';
import { ALL_USERS } from './mocks/user.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Rota /transactions', () => {
  describe('Rota POST /', () => {
    before(async () => {
      sinon
        .stub(AccountModel.prototype, 'findByPk')
        .onFirstCall()
        .resolves(ACCOUNT_USER_1)
        .onSecondCall()
        .resolves(ACCOUNT_USER_2);
      sinon
        .stub(AccountModel.prototype, 'update')
        .onFirstCall()
        .resolves()
        .onSecondCall()
        .resolves();
      sinon
        .stub(TransactionModel.prototype, 'create')
        .resolves(TRANSACTION_CREATED);
      sinon.stub(jwt, 'verify').callsFake(() => {
        return Promise.resolve({ success: 'Token is valid' });
      });
    });
    after(() => {
      (AccountModel.prototype.findByPk as sinon.SinonStub).restore();
      (AccountModel.prototype.update as sinon.SinonStub).restore();
      (TransactionModel.prototype.create as sinon.SinonStub).restore();
      (jwt.verify as sinon.SinonStub).restore();
    });

    it('Caso de sucesso', async () => {
      const result = await chai
        .request(app)
        .post('/transactions')
        .set('authorization', VALID_TOKEN_USER_1)
        .send({
          debitedAccountId: 1,
          creditedAccountId: 2,
          value: '12.00',
        });

      expect(result.status).to.be.equal(201);
      expect(result.body).to.have.property('id');
      expect(result.body).to.have.property('value');
      expect(result.body).to.have.property('createdAt');
      expect(result.body).to.have.property('debitedAccountId');
      expect(result.body).to.have.property('creditedAccountId');
      expect(result.body).to.be.deep.equals(TRANSACTION_CREATED);
    });
  });

  describe('Rota POST /', () => {
    before(async () => {
      sinon
        .stub(AccountModel.prototype, 'findByPk')
        .onFirstCall()
        .rejects(ACCOUNT_USER_1)
        .onSecondCall()
        .resolves(ACCOUNT_USER_2);
      sinon.stub(AccountModel.prototype, 'update').rejects();
      sinon.stub(TransactionModel.prototype, 'create').rejects();
      sinon.stub(jwt, 'verify').callsFake(() => {
        return Promise.resolve({ success: 'Token is valid' });
      });
    });
    after(() => {
      (AccountModel.prototype.findByPk as sinon.SinonStub).restore();
      (AccountModel.prototype.update as sinon.SinonStub).restore();
      (TransactionModel.prototype.create as sinon.SinonStub).restore();
      (jwt.verify as sinon.SinonStub).restore();
    });

    it('Caso de falha - erro na criação', async () => {
      const result = await chai
        .request(app)
        .post('/transactions')
        .set('authorization', VALID_TOKEN_USER_1)
        .send({
          debitedAccountId: 1,
          creditedAccountId: 2,
          value: '12.00',
        });

      expect(result.status).to.be.equal(500);
      expect(result.body.message).to.be.equal('Internal server error');
    });

    it('Caso de falha - valor negativo', async () => {
      const result = await chai
        .request(app)
        .post('/transactions')
        .set('authorization', VALID_TOKEN_USER_1)
        .send({
          debitedAccountId: 1,
          creditedAccountId: 2,
          value: '-12.00',
        });

      expect(result.status).to.be.equal(400);
      expect(result.body.message).to.be.equal(
        "Transaction can't equal or under zero"
      );
    });

    it('Caso de falha - usuário transfere dinheiro para ele mesmo', async () => {
      const result = await chai
        .request(app)
        .post('/transactions')
        .set('authorization', VALID_TOKEN_USER_1)
        .send({
          debitedAccountId: 1,
          creditedAccountId: 1,
          value: '12.00',
        });

      expect(result.status).to.be.equal(401);
      expect(result.body.message).to.be.equal(
        'Transaction must be for different users'
      );
    });
  });

  describe('Rota POST /', () => {
    before(async () => {
      sinon
        .stub(TransactionModel.prototype, 'findAll')
        .resolves(ALL_TRANSACTION);
      sinon
        .stub(TransactionModel.prototype, 'findByDate')
        .resolves([TRANSACTION_CREATED]);
        sinon.stub(jwt, 'verify').callsFake(() => ALL_USERS[0]);
    });
    after(() => {
      (TransactionModel.prototype.findAll as sinon.SinonStub).restore();
      (TransactionModel.prototype.findByDate as sinon.SinonStub).restore();
      (jwt.verify as sinon.SinonStub).restore();
    });

    it('Caso de sucesso - retorna todas as transações', async () => {
      const result = await chai
        .request(app)
        .get('/transactions/filter')
        .set('authorization', VALID_TOKEN_USER_1);

      expect(result.status).to.be.equal(200);
      expect(result.body).to.be.deep.equals(ALL_TRANSACTION);
    });

    it('Caso de sucesso - retorna as transações realizadas', async () => {
      const result = await chai
        .request(app)
        .get('/transactions/filter?search=debit')
        .set('authorization', VALID_TOKEN_USER_1);

      const filterResponse = ALL_TRANSACTION.filter(
        (item) => item.debitedAccountId === 1
      );

      console.log();
      

      expect(result.status).to.be.equal(200);
      expect(result.body).to.be.deep.equals(filterResponse);
    });

    it('Caso de sucesso - retorna as transações recebidas', async () => {
      const result = await chai
        .request(app)
        .get('/transactions/filter?search=credit')
        .set('authorization', VALID_TOKEN_USER_1);

      const filterResponse = ALL_TRANSACTION.filter(
        (item) => item.creditedAccountId === 1
      );

      expect(result.status).to.be.equal(200);
      expect(result.body).to.be.deep.equals(filterResponse);
    });

    it('Caso de sucesso - retorna as transações mediante a data inicial informada', async () => {
      const result = await chai
        .request(app)
        .get('/transactions/filter?date=2022-11-20')
        .set('authorization', VALID_TOKEN_USER_1);

      expect(result.status).to.be.equal(200);
      expect(result.body).to.be.deep.equals([TRANSACTION_CREATED]);
    });

    it('Caso de sucesso - retorna as transações realizadas filtradas por data', async () => {
      const result = await chai
        .request(app)
        .get('/transactions/filter?search=debit&date=2022-11-20')
        .set('authorization', VALID_TOKEN_USER_1);

      expect(result.status).to.be.equal(200);
      expect(result.body).to.be.deep.equals([TRANSACTION_CREATED]);
    });

    it('Caso de sucesso - retorna as transações recebidas filtradas por data', async () => {
      const result = await chai
        .request(app)
        .get('/transactions/filter?search=credit&date=2022-11-20')
        .set('authorization', VALID_TOKEN_USER_1);

      expect(result.status).to.be.equal(200);
      expect(result.body).to.be.deep.equals([]);
    });
  });
});
