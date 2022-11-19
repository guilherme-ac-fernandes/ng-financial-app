import { ICreateTransaction, ITransaction } from '../interfaces/ITransaction';
import Transactions from '../database/models/Transaction';
import { Transaction } from 'sequelize/types';

export default class TransactionModel {
  protected _model = Transactions;

  async findAll(): Promise<ICreateTransaction[] | null> {
    return this._model.findAll();
  }

  async create(
    { creditedAccountId, debitedAccountId, value }: ITransaction,
    transaction: Transaction
  ): Promise<ICreateTransaction> {
    return this._model.create(
      { creditedAccountId, debitedAccountId, value },
      { transaction }
    );
  }
}
