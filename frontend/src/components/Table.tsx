import { ITransactions } from '../interfaces/ITransactions';

interface TableProps {
  transactions: ITransactions[] | [];
}

export default function Table({ transactions }: TableProps) {
  return (
    <table>
      <thead>
        <tr>
          <th>Item</th>
          <th>debitedAccountId</th>
          <th>creditedAccountId</th>
          <th>Value</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{transaction.debitedAccountId}</td>
            <td>{transaction.creditedAccountId}</td>
            <td>{transaction.value}</td>
            <td>{transaction.createdAt}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
