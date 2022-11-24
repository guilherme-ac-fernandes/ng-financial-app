const OLD_TRANSACTION = [
  {
    id: 1,
    debitedAccountId: 1,
    creditedAccountId: 2,
    value: '28.00',
    createdAt: '2022-11-19T14:15:13.000Z',
    debitedAccount: { id: 1, user: { username: 'barneystinson' } },
    creditedAccount: { id: 2, user: { username: 'lilipad' } },
  },
  {
    id: 2,
    debitedAccountId: 2,
    creditedAccountId: 1,
    value: '16.00',
    createdAt: '2022-11-19T19:15:13.000Z',
    debitedAccount: { id: 2, user: { username: 'lilipad' } },
    creditedAccount: { id: 1, user: { username: 'barneystinson' } },
  },
];

export const TRANSACTION_CREATED = {
  id: 3,
  debitedAccountId: 1,
  creditedAccountId: 2,
  value: '12.00',
  createdAt: '2022-11-20T00:18:06.218Z',
};

export const TRANSACTION_CREATED_DETAILS = {
  id: 3,
  debitedAccountId: 1,
  creditedAccountId: 2,
  value: '12.00',
  createdAt: '2022-11-24T20:40:41.855Z',
  debitedAccount: { id: 1, user: { username: 'barneystinson' } },
  creditedAccount: { id: 2, user: { username: 'lilipad' } },
};

export const ALL_TRANSACTION = [
  ...OLD_TRANSACTION,
  TRANSACTION_CREATED_DETAILS,
];
