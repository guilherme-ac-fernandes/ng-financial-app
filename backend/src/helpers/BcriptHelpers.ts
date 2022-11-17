import { hashSync, compareSync } from 'bcryptjs';

export default class BcryptService {
  private static salt = 10;

  public static encrypt(text: string): string {
    return hashSync(text, this.salt);
  }

  public static compare(encryptText: string, planText: string): boolean {
    return compareSync(planText, encryptText);
  }
}
