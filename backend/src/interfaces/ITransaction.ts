export interface ITransaction {
  debitedAccountId: number,
  creditedAccountId: number,
  value: string,
}

export interface ICreateTransaction extends ITransaction {
  id: number,
  createdAt: string,
}
