export interface ILogin {
  username: string,
  password: string,
}

export interface IUser extends ILogin {
  accountId: number,
}

export interface ICreateUser extends IUser {
  id: number,
}

export interface IFilterUser {
  username: string,
  accountId: number,
}
