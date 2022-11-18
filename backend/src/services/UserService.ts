import { ICreateUser, ILogin } from '../interfaces/IUser';
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

  public async findByUsername(username: string) {
    const userFound = await this._user.findByUsername(username) as unknown as ICreateUser;
    if (!userFound) return { code: 404, message: 'User not found' };
    return { code: 200, data: userFound };
  }

  public async findAll() {
    const users = await this._user.findAll();
    if (!users) return { code: 404, message: 'Users not found' };
    return { code: 200, data: users };
  }

  public async login({ username, password }: ILogin) {
    const userFound = await this._user.findByUsername(username) as unknown as ICreateUser;
    if (!userFound || !BcryptService.compare(userFound.password, password)) {
      return { code: 401, message: 'Incorrect username or password' };
    }
    const token = TokenHelpers.createToken(username, userFound.accountId);
    return { code: 200, data: { token, username } };
  }

  // Utilização das transaction proveniente da documentação do Sequelize
  // source: https://sequelize.org/docs/v6/other-topics/transactions/
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
      const token = TokenHelpers.createToken(username, accountId);
      return { code: 201, data: { username, token } };
    } catch (error) {
      // console.log(error);
      await transaction.rollback();
      return { code: 500, message: 'Internal server error' };
    }
  }
}
