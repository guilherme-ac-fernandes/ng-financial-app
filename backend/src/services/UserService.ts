import { ILogin } from '../interfaces/IUser';
import UserModel from '../models/UserModel';
import AccountModel from '../models/AccountModel';
import Sequelize from '../database/models';
import BcryptService from '../helpers/BcriptHelpers';
import TokenHelpers from '../helpers/TokenHelpers';

export default class UserService {
  private _user: UserModel;
  private _account: AccountModel;

  constructor(userModel: UserModel, accountModel: AccountModel) {
    this._user = userModel;
    this._account = accountModel;
  }

  public async findOneUsername(username: string) {
    const userFound = this._user.findOne(username);
    if (!userFound) return null;
    return userFound;
  }

  // public async login(userLogin: ILogin) {
  //   const userFound = this.findOneUsername(
  //     userLogin.username
  //   ) as unknown as ICreateUser;
  //   if (userFound.password !== userLogin.password) {
  //     return { code: 401, message: 'Invalid password' };
  //   }
  // }

  public async create({ username, password }: ILogin) {
    const transaction = await Sequelize.transaction();
    try {
      const { id: accountId } = await this._account.create(
        { balance: 10000 },
        transaction
      );
      await this._user.create(
        { username, password: BcryptService.encrypt(password), accountId },
        transaction
      );
      await transaction.commit();
      const token = TokenHelpers.createToken(username);
      return { token, username };
    } catch (error) {
      console.log(error);
      await transaction.rollback();
      return { message: 'Internal server error' };
    }
  }
}
