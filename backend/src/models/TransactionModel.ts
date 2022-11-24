import { Transaction } from 'sequelize/types';
import { Op } from 'sequelize';
import { ICreateTransaction, ITransaction } from '../interfaces/ITransaction';
import Transactions from '../database/models/Transaction';
import Account from '../database/models/Account';
import User from '../database/models/User';

export default class TransactionModel {
  protected _model = Transactions;
  protected _account = Account;
  protected _user = User;

  public include() {
    return [{
      model: this._account,
      as: 'debitedAccount',
      attributes: ['id'],
      include: [{ model: this._user, as: 'user', attributes: ['username'] }],
    },
    {
      model: this._account,
      as: 'creditedAccount',
      attributes: ['id'],
      include: [{ model: this._user, as: 'user', attributes: ['username'] }],
    }];
  }

  async findAll(accountId: number): Promise<ICreateTransaction[] | null> {
    return this._model.findAll({
      where: {
        [Op.or]: [{ debitedAccountId: accountId }, { creditedAccountId: accountId }],
      },
      include: this.include(),
    });
  }

  async findByDate(
    accountId: number,
    date = '',
  ): Promise<ICreateTransaction[] | null> {
    return this._model.findAll({
      where: {
        [Op.or]: [
          { debitedAccountId: accountId },
          { creditedAccountId: accountId },
        ],
        [Op.and]: [{ createdAt: { [Op.gte]: new Date(date) } }],
      },
      include: this.include(),
    });
  }

  async create(
    { creditedAccountId, debitedAccountId, value }: ITransaction,
    transaction: Transaction,
  ): Promise<ICreateTransaction> {
    return this._model.create(
      { creditedAccountId, debitedAccountId, value },
      { transaction },
    );
  }
}
