import 'dotenv/config';
import { Request, Response, NextFunction } from 'express';
import TokenHelpers from '../helpers/TokenHelpers';

interface NewRequest extends Request {
  username?: string,
}

export default async (req: NewRequest, _res: Response, next: NextFunction) => {
  try {
    const { authorization: token } = req.headers;
    if (!token || token.length === 0) {
      return next({ code: 401, message: 'Token not found' });
    }
    const { username, accountId } = TokenHelpers.verify(token);
    if (Number(accountId) !== Number(req.params.id)) {
      return next({ code: 401, message: 'Unauthorized request' });
    }
    req.username = username;
    next();
  } catch (err) {
    next({ code: 401, message: 'Token must be a valid token' });
  }
};