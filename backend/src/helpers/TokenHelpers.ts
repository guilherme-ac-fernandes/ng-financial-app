import 'dotenv/config';
import { sign, SignOptions } from 'jsonwebtoken';

export default class TokenHelpers {
  private static _secret = process.env.JWT_SECRET || 'jwt_secret';

  public static createToken(username: string): string {
    const jwtConfig: SignOptions = { expiresIn: '1d', algorithm: 'HS256' };
    const token = sign({ username }, this._secret, jwtConfig);
    return token;
  }
}