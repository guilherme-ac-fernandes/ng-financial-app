import { useNavigate } from "react-router-dom";
import Button from "./Button";

export default function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log('logout');
    localStorage.removeItem('user');
    return navigate('/');
    
  };

  return (
    <header>
      <h1>NG_Cash</h1>
      <Button
        text={ 'Logout' }
        type={ "button" }
        disabled={ false }
        handleSubmit={ handleLogout }
        dataTestId={ 'logout-button' }
      />
    </header>
  );
}