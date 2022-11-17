import { useEffect, useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAble, setIsAble] = useState(true);

  const handleSubmit = () => {
    console.log(username, password);
  };

  useEffect(() => {
    const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if(username.length > 3 && password.match(regexPassword)) {
      return setIsAble(false);
    }
    setIsAble(true);
  }, [username, password, setIsAble]);

  return (
    <section>
      <h1>Register</h1>
      <form>
        <Input
          id={ 'register-username' }
          label={ 'Nome do usuário:' }
          type={ 'text' }
          value={ username }
          setValue={ setUsername }
          dataTestId={ 'register-username' }
          placeholder={ 'username' }
        />
        <Input
          id={ 'register-password' }
          label={ 'Senha do usuário:' }
          type={ "password" }
          value={ password }
          setValue={ setPassword }
          dataTestId={ 'register-password' }
          placeholder={ '********' }
        />
        <Button
          text={ 'Register' }
          type={ "button" }
          disabled={ isAble }
          handleSubmit={ handleSubmit }
          dataTestId={ 'register-button' }
        />
      </form>
    </section>
  );
}

