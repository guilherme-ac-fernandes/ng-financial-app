import { Transaction } from 'sequelize/types';
import { Op } from 'sequelize';
import { ICreateTransaction, ITransaction } from '../interfaces/ITransaction';
import Transactions from '../database/models/Transaction';

export default class TransactionModel {
  protected _model = Transactions;

  async findAll(accountId: number): Promise<ICreateTransaction[] | null> {
    return this._model.findAll({
      where: {
        [Op.or]: [{ debitedAccountId: accountId }, { creditedAccountId: accountId }],
      },
    });
  }

  async findByDate(accountId: number, date = ''): Promise<ICreateTransaction[] | null> {
    return this._model.findAll({
      where: {
        [Op.or]: [{ debitedAccountId: accountId }, { creditedAccountId: accountId }],
        [Op.and]: [{ createdAt: { [Op.gte]: new Date(date) } }],
      },
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
