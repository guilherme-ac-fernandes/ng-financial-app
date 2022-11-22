import { useEffect, useState } from 'react';

// Componentes
import EmptyTable from './EmptyTable';

// helpers
import { getUser } from '../helpers/api';
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
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    const getUsers = async () => {
      const allUsers = (await getUser()) as unknown as IUser[];
      const { username, accountId } = getItem('user') as unknown as IUser;
      setUsers([...allUsers, { username, accountId }]);
    };
    getUsers();
  }, []);

  const findUser = (tableId: number) => {
    return users.find(({ accountId }) => accountId === tableId)?.username;
  };

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
                  <td>{findUser(transaction.debitedAccountId)}</td>
                  <td>{findUser(transaction.creditedAccountId)}</td>
                  <td>{`RS ${transaction.value}`}</td>
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
