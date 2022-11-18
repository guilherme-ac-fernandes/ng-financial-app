import TransactionModel from '../models/TransactionModel';
import AccountModel from '../models/AccountModel';
import Sequelize from '../database/models';
import { ICreateAccount } from '../interfaces/IAccount';
import { ITransaction } from '../interfaces/ITransaction';

export default class TransactionService {
  private _transaction: TransactionModel;
  private _account: AccountModel;

  constructor(transactionModel: TransactionModel, accountModel: AccountModel) {
    this._transaction = transactionModel;
    this._account = accountModel;
  }

  // Utilização das transaction proveniente da documentação do Sequelize
  // source: https://sequelize.org/docs/v6/other-topics/transactions/
  public async create({ debitedAccountId, creditedAccountId, value }: ITransaction) {
    const valueUpdated = value * 100;
    const debitedUser = await this._account.findByPk(debitedAccountId) as unknown as ICreateAccount;
    const creditedUser = await this._account.findByPk(creditedAccountId) as unknown as ICreateAccount;
    if (!debitedUser || !creditedUser) return { code: 404, message: 'Invalid account' };
    if (Number(debitedUser.balance) < valueUpdated) {
      return { code: 400, message: 'Insufficient funds' };
    }
    const debitedBalance = debitedUser.balance - valueUpdated;
    const creditedBalance = creditedUser.balance + valueUpdated;
    const transaction = await Sequelize.transaction();

    try {
      const transactionCreated =  await this._transaction.create(
        { debitedAccountId, creditedAccountId, value: valueUpdated },
        transaction
      );
      await this._account.update(debitedAccountId, { balance: debitedBalance }, transaction);
      await this._account.update(creditedAccountId, { balance: creditedBalance },transaction);
      await transaction.commit();      
      return { code: 201, data: transactionCreated };
    } catch (error) {
      await transaction.rollback();
      return { code: 500, message: 'Internal server error' };
    }
  }
}
