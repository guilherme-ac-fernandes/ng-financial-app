import TransactionModel from '../models/TransactionModel';
import AccountModel from '../models/AccountModel';
import Sequelize from '../database/models';
import { ICreateAccount } from '../interfaces/IAccount';
import { ICreateTransaction, ITransaction } from '../interfaces/ITransaction';
import { IQuery } from '../interfaces/IQuery';
import { IResponse } from '../interfaces/IResponse';
import { sumBalance, subBalance } from '../helpers/operation';

const TRANSACTION_NOT_FOUND = { code: 404, message: 'Transactions not found' };
const INSUFFICIENT_FUNDS = { code: 400, message: 'Insufficient funds' };

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
    const debitUser = await this._account.findByPk(debitedAccountId) as unknown as ICreateAccount;
    const creditUser = await this._account.findByPk(creditedAccountId) as unknown as ICreateAccount;
    if (!debitUser || !creditUser) return { code: 404, message: 'Invalid account' };
    if (Number(debitUser.balance) < Number(value)) return INSUFFICIENT_FUNDS;
    const transaction = await Sequelize.transaction();
    try {
      const transactionCreated = await this._transaction
        .create({ debitedAccountId, creditedAccountId, value }, transaction);
      await this._account
        .update(debitedAccountId, subBalance(debitUser.balance, value), transaction);
      await this._account
        .update(creditedAccountId, sumBalance(creditUser.balance, value), transaction);
      await transaction.commit();
      return { code: 201, data: transactionCreated };
    } catch (error) {
      await transaction.rollback();
      return { code: 500, message: 'Internal server error' };
    }
  }

  public async findAll(accountId: number): Promise<IResponse> {
    const transactions = await this._transaction.findAll(accountId);
    if (!transactions) return TRANSACTION_NOT_FOUND;
    return { code: 200, data: transactions };
  }

  static filterBySearch(
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

  // Validação da Data proveniente do site LinuxHint
  // source: https://linuxhint.com/validate-date-javascript/
  public async findAllSearch(accountId: number, query: IQuery): Promise<IResponse> {
    const transactions = await this._transaction.findAll(accountId);
    if (!transactions) return TRANSACTION_NOT_FOUND;
    const transactionsFilterSearch = TransactionService
      .filterBySearch(transactions, accountId, query.search as string);
    if (query.search && !query.date) return { code: 200, data: transactionsFilterSearch };
    if (isNaN(Date.parse(query.date as string))) return { code: 404, message: 'Invalid params' };
    const transactionsFilterDate = await this._transaction.findByDate(accountId, query.date);
    if (!transactionsFilterDate) return TRANSACTION_NOT_FOUND;
    if (!query.search && query.date) return { code: 200, data: transactionsFilterDate };
    const transactionsFilterSearchDate = TransactionService
      .filterBySearch(transactionsFilterDate, accountId, query.search as string);
    if (query.search && query.date) return { code: 200, data: transactionsFilterSearchDate };
    return { code: 200, data: transactions };
  }
}
