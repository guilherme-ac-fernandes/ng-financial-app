import TransactionModal from './TransactionModal';
import styles from './styles/DisplayUser.module.css';

interface DisplayUserProps {
  username?: string;
  balance?: string;
  axiosRequest: () => void;
}

export default function DisplayUser({
  username,
  balance,
  axiosRequest,
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
        <TransactionModal axiosRequest={axiosRequest} />
      </div>
    </header>
  );
}
