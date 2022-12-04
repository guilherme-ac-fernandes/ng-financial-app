import { Request, Response, NextFunction } from 'express';
import { ICreateTransaction, ITransaction } from '../interfaces/ITransaction';
import TransactionService from '../services/TransactionService';

interface NewRequest extends Request {
  username?: string,
  accountId?: number,
}

interface IResponse {
  code: number,
  message?: string,
  data?: ICreateTransaction,
}

export default class TransactionController {
  private _transaction: TransactionService;

  constructor(service: TransactionService) {
    this._transaction = service;
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    const {
      debitedAccountId,
      creditedAccountId,
      value,
    } = req.body as ITransaction;
    const { code, message, data } = await this._transaction.create({
      creditedAccountId,
      debitedAccountId,
      value,
    }) as unknown as IResponse;
    if (message) return next({ code, message });
    return res.status(code).json(data);
  }

  public async findAll(req: Request, res: Response, next: NextFunction) {
    const { accountId } = req as NewRequest;
    if (req.query.search || req.query.date) {
      const { code, message, data } = await this._transaction
        .findAllSearch(Number(accountId), req.query);
      if (message) return next({ code, message });
      return res.status(code).json(data);
    }
    const { code, message, data } = await this._transaction.findAll(Number(accountId));
    if (message) return next({ code, message });
    return res.status(code).json(data);
  }
}
