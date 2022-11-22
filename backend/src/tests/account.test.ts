import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../api/app';

// Model
import AccountModel from '../models/AccountModel';

// Mocks
import { ACCOUNT_USER } from './mocks/account.mock';
import {
  VALID_TOKEN_USER_1,
  VALID_TOKEN_USER_2,
  INVALID_VALID_TOKEN,
} from './mocks/token.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Rota /account', () => {
  describe('Rota GET /:id', () => {
    before(async () =>
      sinon.stub(AccountModel.prototype, 'findByPk').resolves(ACCOUNT_USER)
    );
    after(() => (AccountModel.prototype.findByPk as sinon.SinonStub).restore());

    it('Caso de sucesso', async () => {
      const result = await chai
        .request(app)
        .get('/account/1')
        .set('authorization', VALID_TOKEN_USER_1);

      expect(result.status).to.be.equal(200);
      expect(result.body).to.have.property('id');
      expect(result.body).to.have.property('balance');
      expect(result.body).to.be.deep.equals(ACCOUNT_USER);
    });
  });

  describe('Rota GET /:id', () => {
    it('Caso de falha - Token Inválido', async () => {
      const result = await chai
        .request(app)
        .get('/account/1')
        .set('authorization', INVALID_VALID_TOKEN);

      expect(result.status).to.be.equal(401);
      expect(result.body.message).to.be.equal('Token must be a valid token');
    });

    it('Caso de falha - Sem Token', async () => {
      const result = await chai.request(app).get('/account/1');

      expect(result.status).to.be.equal(401);
      expect(result.body.message).to.be.equal('Token not found');
    });

    it('Caso de falha - Token de outro usuário', async () => {
      const result = await chai
        .request(app)
        .get('/account/1')
        .set('authorization', VALID_TOKEN_USER_2);

      expect(result.status).to.be.equal(401);
      expect(result.body.message).to.be.equal('Unauthorized request');
    });
  });
});
