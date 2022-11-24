import { Request, Response, NextFunction } from 'express';
import { ITransaction } from '../interfaces/ITransaction';

export default async (req: Request, _res: Response, next: NextFunction) => {
  const { debitedAccountId, creditedAccountId, value } = req.body as ITransaction;
  if (Number(value) <= 0) {
    return next({ code: 400, message: 'Transaction can\'t equal or under zero' });
  }
  if (debitedAccountId === creditedAccountId) {
    return next({ code: 401, message: 'Transaction must be for different users' });
  }
  next();
};
