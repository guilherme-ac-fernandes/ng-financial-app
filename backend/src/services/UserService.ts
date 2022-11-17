import { ICreateUser, ILogin } from '../interfaces/IUser';
import UserModel from '../models/UserModel';
// import sequelize from '../database/models';

export default class UserService {
  private _model: UserModel;

  constructor(model: UserModel) {
    this._model = model;
  }

  public async findOneUsername(username: string) {
    const userFound = this._model.findOne(username);
    if (!userFound) return null;
    return userFound;
  }

  public async login(userLogin: ILogin) {
    const userFound = this.findOneUsername(
      userLogin.username
    ) as unknown as ICreateUser;
    if (userFound.password !== userLogin.password) {
      return { code: 401, message: 'Invalid password' };
    }
  }

  // public async create() {
  //   const t = await sequelize.transaction();
  //   try {
  //     const { id } = this.create;
  //   } catch (error) {}
  // }
}
