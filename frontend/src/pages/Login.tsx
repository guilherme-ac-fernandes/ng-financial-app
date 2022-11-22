import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Componentes
import Button from '../components/Button';
import Input from '../components/Input';
import ValidatePassword from '../components/ValidatePassword';

// helpers
import { login } from '../helpers/api';
import { setItem } from '../helpers/localStorage';

// Styles
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
    if (username.length >= 3 && password.match(regexPassword)) {
      return setIsAble(false);
    }
    setIsAble(true);
  }, [username, password, setIsAble]);

  const title = '<NG_CASH />';

  return (
    <section className={styles.loginContainer}>
      <form className={styles.loginFormContainer}>
        <h1>{title}</h1>
        <Input
          id={'login-username'}
          label={'Nome do usuário:'}
          type={'text'}
          value={username}
          setValue={setUsername}
          dataTestId={'login-username'}
          placeholder={'nome com no mínimo 3 caracteres'}
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
        <ValidatePassword password={password} />
        <aside className={styles.loginButtonContainer}>
          <Button
            text={'Cadastrar'}
            type={'button'}
            disabled={false}
            handleSubmit={() => navigate('/register')}
            dataTestId={'login-button'}
          />
          <Button
            text={'Entrar'}
            type={'button'}
            disabled={isAble}
            handleSubmit={handleSubmit}
            dataTestId={'login-button'}
            />
        </aside>
        
      </form>
    </section>
  );
}
