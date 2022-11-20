import { ICreateTransaction } from './ITransaction';

export interface IResponse {
  code: number,
  data?: ICreateTransaction[] | [],
  message?: string,
}
