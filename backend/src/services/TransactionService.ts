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
    const transactions = await this._transaction.findAll();
    if (!transactions) return { code: 404, message: 'Transactions not found' };
    const transactionsFilter = transactions.filter(
      ({ creditedAccountId, debitedAccountId }) =>
        creditedAccountId === accountId || debitedAccountId === accountId
    );
    return { code: 200, data: transactionsFilter };
  }

  public async findAllSearch(accountId: number, search: string) {
    const transactions = await this._transaction.findAll();
    if (!transactions) return { code: 404, message: 'Transactions not found' };
    const transactionsFilter = transactions.filter(
      ({ creditedAccountId, debitedAccountId }) =>
        creditedAccountId === accountId || debitedAccountId === accountId
    );
    switch (search) {
      case 'debit': 
        return { code: 200, data: transactions
            .filter(({ debitedAccountId }) => debitedAccountId === accountId) }
      case 'credit': 
        return { code: 200, data: transactions
          .filter(({ creditedAccountId }) => creditedAccountId === accountId) }
      default:
        // Validação de datas para não retorna erro proveniente do site LinuxHint
        // source: https://linuxhint.com/validate-date-javascript/
        if (isNaN(Date.parse(search))) return { code: 404, message: 'Invalid params' };
        return { code: 200, data: transactionsFilter
          .filter(({ createdAt }) => new Date(createdAt) >= new Date(search)) };
    }
  }
}
