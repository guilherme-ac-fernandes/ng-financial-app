import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Componentes
import DisplayUser from '../components/DisplayUser';
import Filters from '../components/Filters';
import Header from '../components/Header';
import Loading from '../components/Loading';
import Table from '../components/Table';

// helpers
import { getBalance, getTransactionsDefault, getUser } from '../helpers/api';
import { getItem } from '../helpers/localStorage';

// Interfaces
import { IAccount } from '../interfaces/IAccount';
import { ITransactions } from '../interfaces/ITransactions';
import { IUser } from '../interfaces/IUser';

// Style
import styles from './styles/Transactions.module.css';

export default function Transactions() {
  const [user, setUser] = useState<IUser>({});
  const [users, setUsers] = useState<IUser[]>([]);
  const [balance, setBalance] = useState<string>('');
  const [transactions, setTransactions] = useState<ITransactions[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const userLocalStorage = getItem('user') as unknown as IUser;
    if (!userLocalStorage) return navigate('/');
    setUser(userLocalStorage);
    if (balance === '' && transactions.length === 0) {
      axiosRequest();
    }
    if (users.length === 0) {
      getUsers();
    }
    setLoading(false);
  }, [navigate, balance, transactions, users]);

  const getUsers = async () => {
    const allUsers = (await getUser()) as unknown as IUser[];
    const { username } = getItem('user') as unknown as IUser;
    setUsers(allUsers.filter((user) => user.username !== username));
  };

  const axiosRequest = async () => {
    const balanceAxios = (await getBalance()) as unknown as IAccount;
    setBalance(balanceAxios.balance as string);
    const transactionsAxios =
      (await getTransactionsDefault()) as unknown as ITransactions[];
    setTransactions(transactionsAxios);
  };

  const updateTransactions = (payload: ITransactions[]) => {
    setTransactions(payload);
  };

  return (
    <main className={styles.transactionsContainer}>
      <Header />
      {loading ? (
        <Loading />
      ) : (
        <section>
          <DisplayUser
            username={user.username}
            balance={balance}
            axiosRequest={axiosRequest}
            users={users}
          />
          <Filters updateTransactions={updateTransactions} />
          <Table transactions={transactions} loading={loading} />
        </section>
      )}
    </main>
  );
}
