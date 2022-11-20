import TransactionModel from '../models/TransactionModel';
import AccountModel from '../models/AccountModel';
import Sequelize from '../database/models';
import { ICreateAccount } from '../interfaces/IAccount';
import { ICreateTransaction, ITransaction } from '../interfaces/ITransaction';
import { IQuery } from '../interfaces/IQuery';

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
    const debitedUser = await this._account.findByPk(debitedAccountId) as unknown as ICreateAccount;
    const creditedUser = await this._account.findByPk(creditedAccountId) as unknown as ICreateAccount;
    if (!debitedUser || !creditedUser) return { code: 404, message: 'Invalid account' };
    if (Number(debitedUser.balance) < value) {
      return { code: 400, message: 'Insufficient funds' };
    }
    const debitedBalance = Number(debitedUser.balance) - value;
    const creditedBalance = Number(creditedUser.balance) + value;
    const transaction = await Sequelize.transaction();

    try {
      const transactionCreated =  await this._transaction.create(
        { debitedAccountId, creditedAccountId, value },
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

  public async findAll(accountId: number) {
    const transactions = await this._transaction.findAll(accountId);
    if (!transactions) return { code: 404, message: 'Transactions not found' };
    return { code: 200, data: transactions };
  }

  static filterBySearch (
    transactionsFilter: ICreateTransaction[],
    accountId: number,
    search: string,
    ) {
    return transactionsFilter.filter((item) => {
      if (search === 'debit' && item.debitedAccountId === accountId) return true;
      if (search === 'credit' && item.creditedAccountId === accountId) return true;
      return false;
    });
  }

  public async findAllSearch(accountId: number, query: IQuery) {
    const transactions = await this._transaction.findAll(accountId);
    if (!transactions) return { code: 404, message: 'Transactions not found' };
    if (query.search && !query.date) return {
      code: 200,
      data: TransactionService.filterBySearch(transactions, accountId, query.search),
    };
    if (isNaN(Date.parse(query.date as string))) return { code: 404, message: 'Invalid params' };
    const transactionsFilterDate = await this._transaction.findByDate(accountId, query.date);
    if (!transactionsFilterDate) return { code: 404, message: 'Transactions not found' };
    if (!query.search && query.date) return {
      code: 200,
      data: transactionsFilterDate,
    };
    if (query.search && query.date) return {
      code: 200,
      data: TransactionService.filterBySearch(transactionsFilterDate, accountId, query.search),
    };
    return { code: 200, data: transactions };
  }
}
