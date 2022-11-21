import axios from 'axios';
import { ILogin } from '../interfaces/ILogin';
import { IUser } from '../interfaces/IUser';
import { getItem } from './localStorage';

const api = axios.create({ baseURL: 'http://localhost:3001' });

export const login = async (body: ILogin) => {
  const data = await api.post('/login', body)
    .then((response) => response.data);
  return data;
};

export const register = async (body: ILogin) => {
  const data = await api.post('/register', body)
    .then((response) => response.data);
  return data;
};

export const getBalance = async () => {
  const user = getItem('user') as unknown as IUser;
  const data = await api.get(
    `/account/${user.accountId}`,
    { headers: { Authorization: `${user.token}` } },
    ).then((response) => response.data);
  return data;
};

export const getTransactionsDefault = async () => {
  const user = getItem('user') as unknown as IUser;
  const data = await api.get(
    '/transactions/filter',
    { headers: { Authorization: `${user.token}` } },
    ).then((response) => response.data);
  return data;
};

export const getUser = async () => {
  const user = getItem('user') as unknown as IUser;
  const data = await api.get(
    '/user',
    { headers: { Authorization: `${user.token}` } },
    ).then((response) => response.data);
  return data;
};

export const createTransactions = async (creditedAccountId: number, value: string) => {
  const user = getItem('user') as unknown as IUser;
  const body = { debitedAccountId: user.accountId, creditedAccountId, value };
  const data = await api.post(
    '/transactions',
    body,
    { headers: { Authorization: `${user.token}` } },
    ).then((response) => response.data);
  return data;
};
