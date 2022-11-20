import 'dotenv/config';
import { Request, Response, NextFunction } from 'express';
import TokenHelpers from '../helpers/TokenHelpers';

interface NewRequest extends Request {
  username?: string,
  accountId?: number,
}

export default async (req: NewRequest, _res: Response, next: NextFunction) => {
  try {
    const { authorization: token } = req.headers;
    if (!token || token.length === 0) {
      return next({ code: 401, message: 'Token not found' });
    }
    const { username, accountId } = TokenHelpers.verify(token);
    req.username = username;
    req.accountId = accountId;
    next();
  } catch (err) {
    next({ code: 401, message: 'Token must be a valid token' });
  }
};
