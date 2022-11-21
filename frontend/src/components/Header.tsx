import { useNavigate } from 'react-router-dom';
import styles from './styles/Header.module.css';

export default function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    return navigate('/');
  };

  return (
    <header className={styles.headerContainer}>
      <h1 className={styles.headerTitle}>NG_Cash</h1>
      <div onClick={handleLogout} className={styles.divLogout}>
        <span className='material-symbols-outlined'>logout</span>
        {' '}
        <span>Sair</span>
      </div>
    </header>
  );
}
