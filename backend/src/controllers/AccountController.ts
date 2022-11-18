import { Request, Response, NextFunction } from 'express';
import AccountService from '../services/AccountService';

export default class AccountController {
  private _account: AccountService;

  constructor(service: AccountService) {
    this._account = service;
  }

  public async findByPk(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const { code, message, data } = await this._account.findByPk(Number(id));
    if (message) return next({ code, message });
    return res.status(code).json(data);
  }
}