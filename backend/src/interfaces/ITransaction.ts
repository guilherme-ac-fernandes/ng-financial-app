export interface ITransaction {
  debitedAccountId: number,
  creditedAccountId: number,
  value: number,
}

export interface ICreateTransaction extends ITransaction {
  id: number,
  createdAt: string,
}