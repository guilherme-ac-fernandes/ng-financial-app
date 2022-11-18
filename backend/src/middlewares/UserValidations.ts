import { Request, Response, NextFunction } from 'express';
import UserService from '../services/UserService';
import { ILogin } from '../interfaces/IUser';
import UserModel from '../models/UserModel';
import AccountModel from '../models/AccountModel';

const userModel = new UserModel();
const accountModel = new AccountModel();
const userService = new UserService(userModel, accountModel);

export default async (req: Request, _res: Response, next: NextFunction) => {
  const { username, password } = req.body as ILogin;
  if (!username || username.length < 3) {
    return next({ code: 400, message: 'Invalid username' });
  }
  const regexPassword = /^(?=.*\d)(?=.*[A-Z])[0-9a-zA-Z$*&@#]{8,}$/;
  if (!password.match(regexPassword)) {
    return next({ code: 400, message: 'Invalid password' });
  }
  const { data } = await userService.findByUsername(username);
  if (data) return next({ code: 400, message: 'Username already exists' });
  next();
}
