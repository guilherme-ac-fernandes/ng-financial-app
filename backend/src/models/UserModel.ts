import { Transaction } from 'sequelize/types';
import { IUser, ICreateUser, IFilterUser } from '../interfaces/IUser';
import User from '../database/models/User';

export default class UserModel {
  protected _model = User;

  async findByUsername(username: string): Promise<ICreateUser | null> {
    return this._model.findOne({ where: { username } });
  }

  async findAll(): Promise<IFilterUser[] | null> {
    return this._model.findAll({ attributes: { exclude: ['id', 'password'] } });
  }

  async create(
    { username, password, accountId }: IUser,
    transaction: Transaction,
  ): Promise<ICreateUser | null> {
    return this._model.create(
      { username, password, accountId },
      { transaction },
    );
  }
}
