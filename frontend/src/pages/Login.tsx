import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Input from '../components/Input';
import { login } from '../helpers/api';
import { setItem } from '../helpers/localStorage';

import styles from './styles/Login.module.css';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAble, setIsAble] = useState(true);
  const [invalidUserAlert, setInvalidUserAlert] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      setInvalidUserAlert(false);
      const user = await login({ username, password });
      setItem('user', user);
      return navigate(`/transactions/${user.accountId}`);
    } catch (error) {
      setInvalidUserAlert(true);
    }
  };

  useEffect(() => {
    // Regex para validação da senha proveniente do Stack OverFlow após adaptação
    // source: https://pt.stackoverflow.com/questions/373574/regex-para-senha-forte#:~:text=1%20Letra%20Maiúscula%20no%20m%C3%ADnimo,%2C%20bb%20%2C%2044%20%2C%20etc
    const regexPassword = /^(?=.*\d)(?=.*[A-Z])[0-9a-zA-Z$*&@#]{8,}$/;
    if (username.length > 3 && password.match(regexPassword)) {
      return setIsAble(false);
    }
    setIsAble(true);
  }, [username, password, setIsAble]);

  return (
    <section className={styles.loginContainer}>
      <form className={styles.loginFormContainer}>
        <h1>NG_Cash</h1>
        <Input
          id={'login-username'}
          label={'Nome do usuário:'}
          type={'text'}
          value={username}
          setValue={setUsername}
          dataTestId={'login-username'}
          placeholder={'username'}
        />
        <Input
          id={'login-password'}
          label={'Senha do usuário:'}
          type={'password'}
          value={password}
          setValue={setPassword}
          dataTestId={'login-password'}
          placeholder={'********'}
        />
        {invalidUserAlert && (
          <p className={styles.loginAlert}>
            Usuário não existe, faça o cadastro
          </p>
        )}

        <aside className={styles.loginButtonContainer}>
          <Button
            text={'Login'}
            type={'button'}
            disabled={isAble}
            handleSubmit={handleSubmit}
            dataTestId={'login-button'}
            />
          <Button
            text={'Register'}
            type={'button'}
            disabled={false}
            handleSubmit={() => navigate('/register')}
            dataTestId={'login-button'}
          />
        </aside>
        
      </form>
    </section>
  );
}
