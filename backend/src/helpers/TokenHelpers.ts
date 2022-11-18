import 'dotenv/config';
import { sign, SignOptions, verify } from 'jsonwebtoken';
import { IToken } from '../interfaces/IToken';

export default class TokenHelpers {
  private static _secret = process.env.JWT_SECRET || 'jwt_secret';

  public static createToken(username: string, accountId: number): string {
    const jwtConfig: SignOptions = { expiresIn: '1d', algorithm: 'HS256' };
    const token = sign({ username, accountId }, this._secret, jwtConfig);
    return token;
  }

  public static verify(token: string) {
    const result = verify(token, this._secret) as unknown as IToken;
    return result;
  }
}