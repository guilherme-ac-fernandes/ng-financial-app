import { Request, Response, NextFunction } from 'express';
import UserService from '../services/UserService';

export default class CarController {
  private _user: UserService;
  constructor(service: UserService) {
    this._user = service;
  }

  public async findAll(_req: Request, res: Response, next: NextFunction) {
    const { code, message, data } = await this._user.findAll();
    if (message) return next({ code, message });
    return res.status(code).json(data);
  }

  public async login(req: Request, res: Response, next: NextFunction) {
    const { username, password } = req.body;
    const { code, message, data } = await this._user.login({ username, password });
    if (message) return next({ code, message });
    return res.status(code).json(data);
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    const { username, password } = req.body;
    const { code, message, data } = await this._user.create({ username, password });
    if (message) return next({ code, message });
    return res.status(code).json(data);
  }

}