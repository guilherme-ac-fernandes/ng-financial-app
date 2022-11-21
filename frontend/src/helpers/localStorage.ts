import { IUser } from "../interfaces/IUser";

export const setItem = (key: string, value: IUser) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getItem = (key: string) => {
  const data = localStorage.getItem(key);
  if (data === null) return null
  const dataParse = JSON.parse(data as string);
  return dataParse;
};