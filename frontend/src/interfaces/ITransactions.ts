export interface ITransactions {
  id: number;
  debitedAccountId: number;
  creditedAccountId: number;
  value: string;
  createdAt: string;
  debitedAccount: { id: number; user: { username: string } };
  creditedAccount: { id: number; user: { username: string } };
}
