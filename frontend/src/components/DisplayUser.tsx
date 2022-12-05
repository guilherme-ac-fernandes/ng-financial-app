import TransactionModal from './TransactionModal';
import styles from './styles/DisplayUser.module.css';
import { IUser } from '../interfaces/IUser';

interface DisplayUserProps {
  username?: string;
  balance?: string;
  axiosRequest: () => void;
  users: IUser[],
}

export default function DisplayUser({
  username,
  balance,
  axiosRequest,
  users,
}: DisplayUserProps) {
  return (
    <header className={styles.displayUserContainer}>
      <h2 className={styles.displayUserTitle}>
        <span className='material-symbols-outlined'>account_circle</span>
        {' '}
        {username}
      </h2>
      <div className={styles.balanceModalContainer}>
        <h5>{`Saldo: R$ ${balance}`}</h5>
        <TransactionModal users={users} axiosRequest={axiosRequest} />
      </div>
    </header>
  );
}
