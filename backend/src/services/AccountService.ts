import AccountModel from '../models/AccountModel';

export default class AccountService {
  private _account: AccountModel;

  constructor(model: AccountModel) {
    this._account = model;
  }

  public async findByPk(id: number) {
    const accountFound = await this._account.findByPk(id);
    if (!accountFound) return { code: 404, message: 'Account not found' };
    return { code: 200, data: accountFound };
  }


}
