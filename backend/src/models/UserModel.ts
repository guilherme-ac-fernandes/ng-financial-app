import { IUser, ICreateUser } from '../interfaces/IUser';
import { Transaction } from 'sequelize/types';
import User from '../database/models/User';

export default class UserModel {
  protected _model = User;

  async findByUsername(username: string): Promise<ICreateUser | null> {
    return this._model.findOne({ where: { username } });
  }

  async findAll(): Promise<ICreateUser[] | null> {
    return this._model.findAll({ attributes: { exclude: ['id', 'password', 'accountId'] } });
  }

  async create(
    { username, password, accountId }: IUser,
    transaction: Transaction
  ): Promise<ICreateUser | null> {
    return this._model.create(
      { username, password, accountId },
      { transaction }
    );
  }
}

