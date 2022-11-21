import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import NotFound from '../components/NotFound';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Transactions from '../pages/Transactions';

// Estruturação do React-Router-Dom proveniente do Stack OverFlow
// source: https://stackoverflow.com/questions/69868956/how-can-i-redirect-in-react-router-v6
export default function FinancialAppRoutes() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user || user.length > 0) {
      return setLoggedIn(false);
    }
    return setLoggedIn(true);
  }, []);

  return (
    <Routes>
       <Route exact path="/" element={ loggedIn ?  <Transactions /> : <Login /> } />
       <Route exact path="/register" element={ <Register /> } />
       <Route exact path="/transactions/" element={ <Transactions /> } />
       <Route exact path="*" element={ <NotFound /> } />
     </Routes>
  );
}
