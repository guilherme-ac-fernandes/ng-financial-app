import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAble, setIsAble] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = () => {
    console.log(username, password);
  };

  useEffect(() => {
    // Regex para validação da senha proveniente do Stack OverFlow
    // source: https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a 
    const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if(username.length > 3 && password.match(regexPassword)) {
      return setIsAble(false);
    }
    setIsAble(true);
  }, [username, password, setIsAble]);

  return (
    <section>
      <h1>Login</h1>
      <form>
        <Input
          id={ 'login-username' }
          label={ 'Nome do usuário:' }
          type={ 'text' }
          value={ username }
          setValue={ setUsername }
          dataTestId={ 'login-username' }
          placeholder={ 'username' }
        />
        <Input
          id={ 'login-password' }
          label={ 'Senha do usuário:' }
          type={ "password" }
          value={ password }
          setValue={ setPassword }
          dataTestId={ 'login-password' }
          placeholder={ '********' }
        />
        <Button
          text={ 'Login' }
          type={ "button" }
          disabled={ isAble }
          handleSubmit={ handleSubmit }
          dataTestId={ 'login-button' }
        />
        <Button
          text={ 'Register' }
          type={ "button" }
          disabled={ false }
          handleSubmit={ () => navigate('/register') }
          dataTestId={ 'login-button' }
        />
      </form>
    </section>
  );
}
