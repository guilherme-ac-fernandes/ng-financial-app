import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Componentes
import EmptyTable from './EmptyTable';

// helpers
import { formatDate, formatHour } from '../helpers/dateHelper';
import { getItem } from '../helpers/localStorage';

// Interfaces
import { ITransactions } from '../interfaces/ITransactions';
import { IUser } from '../interfaces/IUser';

// Styles
import styles from './styles/Table.module.css';

interface TableProps {
  transactions: ITransactions[] | [];
  loading: boolean;
}

export default function Table({ transactions, loading }: TableProps) {
  const [user, setUser] = useState<IUser>({});
  const navigate = useNavigate();

  useEffect(() => {
    const userLocalStorage = getItem('user') as unknown as IUser;
    if (!userLocalStorage) return navigate('/');
    setUser(userLocalStorage);
  }, [navigate]);

  return (
    <section className={styles.tableContainer}>
      {!loading && transactions.length === 0 ? (
        <EmptyTable />
      ) : (
        <div>
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Realizado por</th>
                <th>Recebido por</th>
                <th>Value</th>
                <th>Date</th>
                <th>Horário</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction, index) => (
                <tr key={`table-${index}`}>
                  <td>{index + 1}</td>
                  <td>{transaction.debitedAccount.user.username}</td>
                  <td>{transaction.creditedAccount.user.username}</td>
                  <td
                    className={
                      transaction.debitedAccount.user.username === user.username
                        ? styles.valid
                        : styles.invalid
                    }
                  >{`RS ${Number(transaction.value).toFixed(2)}`}</td>
                  <td>{formatDate(transaction.createdAt as string)}</td>
                  <td>{formatHour(transaction.createdAt as string)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
