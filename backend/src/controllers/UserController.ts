import { Request, Response, NextFunction } from 'express';
import UserService from '../services/UserService';
// import { IUser, ILogin, ICreateUser } from '../interfaces/IUser';

export default class CarController {
  private _user: UserService;
  constructor(service: UserService) {
    this._user = service;
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    const { username, password } = req.body;
    const result = await this._user.create({ username, password });
    if (result.message) {
      next({ code: 500, message: result.message });
    }
    return res.status(201).json(result);
  }

}