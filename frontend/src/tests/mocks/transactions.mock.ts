import { ITransactions } from '../../interfaces/ITransactions';

export const transactionsMock: ITransactions[] = [
  {
    id: 1,
    debitedAccountId: 1,
    creditedAccountId: 2,
    value: '28',
    createdAt: '2022-11-19T14:15:13.000Z',
    debitedAccount: {
      id: 1,
      user: {
        username: 'barneystinson',
      },
    },
    creditedAccount: {
      id: 2,
      user: {
        username: 'lilipad',
      },
    },
  },
  {
    id: 2,
    debitedAccountId: 2,
    creditedAccountId: 1,
    value: '16',
    createdAt: '2022-11-19T19:15:13.000Z',
    debitedAccount: {
      id: 2,
      user: {
        username: 'lilipad',
      },
    },
    creditedAccount: {
      id: 1,
      user: {
        username: 'barneystinson',
      },
    },
  },
];
