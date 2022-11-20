import axios from 'axios';
import { ILogin } from '../interfaces/ILogin';

const api = axios.create({ baseURL: 'http://localhost:3001' });

export const login = async (body: ILogin) => {
  const data = await api.post('/login', body)
    .then((response) => response.data);
  return data;
};