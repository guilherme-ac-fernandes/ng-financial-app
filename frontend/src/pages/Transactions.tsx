import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Componentes
import DisplayUser from '../components/DisplayUser';
import Filters from '../components/Filters';
import Header from '../components/Header';
import Loading from '../components/Loading';
import Table from '../components/Table';

// helpers
import { getBalance, getTransactionsDefault } from '../helpers/api';
import { getItem } from '../helpers/localStorage';

// Interfaces
import { IAccount } from '../interfaces/IAccount';
import { ITransactions } from '../interfaces/ITransactions';
import { IUser } from '../interfaces/IUser';

// Style
import styles from './styles/Transactions.module.css';

export default function Transactions() {
  const [user, setUser] = useState<IUser>({});
  const [balance, setBalance] = useState<string>('');
  const [transactions, setTransactions] = useState<ITransactions[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showTable, setShowTable] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setShowTable(false);
    const userLocalStorage = getItem('user') as unknown as IUser;
    if (!userLocalStorage) return navigate('/');
    setUser(userLocalStorage);
    axiosRequest();
    setLoading(false);
    setShowTable(true);
  }, [navigate]);

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
          />
          <Filters updateTransactions={updateTransactions} />
          <Table transactions={transactions} loading={loading} />
        </section>
      )}
    </main>
  );
}
