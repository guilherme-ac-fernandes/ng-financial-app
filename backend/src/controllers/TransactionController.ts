import { Request, Response, NextFunction } from 'express';
import { ITransaction } from '../interfaces/ITransaction';
import TransactionService from '../services/TransactionService';

export default class TransactionController {
  private _transaction: TransactionService;

  constructor(service: TransactionService) {
    this._transaction = service;
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    const { debitedAccountId, creditedAccountId, value } =
      req.body as ITransaction;
    const { code, message, data } = await this._transaction.create({
      creditedAccountId,
      debitedAccountId,
      value,
    });
    if (message) return next({ code, message });
    return res.status(code).json(data);
  }
}
