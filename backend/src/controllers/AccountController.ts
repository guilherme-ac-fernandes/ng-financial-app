import { Request, Response, NextFunction } from 'express';
import AccountService from '../services/AccountService';

interface NewRequest extends Request {
  username?: string,
  accountId?: number,
}

export default class AccountController {
  private _account: AccountService;

  constructor(service: AccountService) {
    this._account = service;
  }

  public async findByPk(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const { accountId } = req as NewRequest;

    if (Number(accountId) !== Number(req.params.id)) {
      return next({ code: 401, message: 'Unauthorized request' });
    }

    const { code, message, data } = await this._account.findByPk(Number(id));
    if (message) return next({ code, message });
    return res.status(code).json(data);
  }
}
