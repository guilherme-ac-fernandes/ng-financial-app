import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Componentes
import DisplayUser from "../components/DisplayUser";
import Filters from "../components/Filters";
import Header from "../components/Header";
import Loading from "../components/Loading";
import Table from "../components/Table";

// helpers
import { getBalance, getTransactionsDefault } from "../helpers/api";
import { getItem } from "../helpers/localStorage";

// Interfaces
import { IAccount } from "../interfaces/IAccount";
import { ITransactions } from "../interfaces/ITransactions";
import { IUser } from "../interfaces/IUser";

export default function Transactions() {
  const [user, setUser] = useState<IUser>({});
  const [balance, setBalance] = useState<string>('');
  const [transactions, setTransactions] = useState<ITransactions[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const userLocalStorage = getItem('user') as unknown as IUser;
    if (!userLocalStorage) return navigate('/');
    setUser(userLocalStorage);
    axiosRequest();
    setLoading(false);
  }, [navigate]);

  const axiosRequest = async () => {
    const balanceAxios = await getBalance() as unknown as IAccount;
    setBalance(balanceAxios.balance as string);
    const transactionsAxios = await getTransactionsDefault() as unknown as ITransactions[];
    setTransactions(transactionsAxios);
  };

  return (
    <main> 
      <Header />
      { loading ? (
        <Loading />
      ) : (
        <section>
          <DisplayUser
            username={ user.username }
            balance={ balance }
            axiosRequest={ axiosRequest }
          />
          <Filters />
          <Table transactions={ transactions } />
        </section>
      ) }
    </main>
  );
}