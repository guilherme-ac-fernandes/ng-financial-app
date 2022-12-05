import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Componentes
import Button from '../components/Button';
import Input from '../components/Input';
import ValidatePassword from '../components/ValidatePassword';

// helpers
import { register } from '../helpers/api';
import { setItem } from '../helpers/localStorage';

// Styles
import styles from './styles/Register.module.css';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAble, setIsAble] = useState(true);
  const [erroRegisterAlert, setErroRegisterAlert] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      setErroRegisterAlert(false);
      const user = await register({ username, password });
      setItem('user', user);
      localStorage.setItem('user', JSON.stringify(user));
      return navigate(`/transactions/${user.accountId}`);
    } catch (error) {
      setErroRegisterAlert(true);
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

  return (
    <section className={styles.registerContainer}>
      <form className={styles.registerFormContainer}>
        <h1 data-testid="register-title">CADASTRO</h1>
        <Input
          id={'register-username'}
          label={'Nome do usuário:'}
          type={'text'}
          value={username}
          setValue={setUsername}
          dataTestId={'register-username'}
          placeholder={'nome com no mínimo 3 caracteres'}
        />
        <Input
          id={'register-password'}
          label={'Senha do usuário:'}
          type={'password'}
          value={password}
          setValue={setPassword}
          dataTestId={'register-password'}
          placeholder={'********'}
        />
        {erroRegisterAlert && (
          <p className={styles.registerAlert} data-testid="register-alert">
            Erro no cadastro, tente novamente!
          </p>
        )}
        <ValidatePassword password={password} />
        <aside className={styles.registerButtonContainer}>
          <Button
            text={'Voltar'}
            type={'button'}
            disabled={false}
            handleSubmit={() => navigate('/')}
            dataTestId={'return-login-button'}
          />
          <Button
            text={'Cadastrar'}
            type={'button'}
            disabled={isAble}
            handleSubmit={handleRegister}
            dataTestId={'register-button'}
          />
        </aside>
      </form>
    </section>
  );
}
