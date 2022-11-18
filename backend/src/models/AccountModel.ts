import { IAccount, ICreateAccount } from '../interfaces/IAccount';
import Account from '../database/models/Account';
import { Transaction } from 'sequelize/types';

export default class AccountModel {
  protected _model = Account;

  async findByPk(id: number): Promise<ICreateAccount | null> {
    return this._model.findByPk(id);
  }

  async create(
    { balance }: IAccount,
    transaction: Transaction
  ): Promise<ICreateAccount> {
    return this._model.create({ balance }, { transaction });
  }
}
