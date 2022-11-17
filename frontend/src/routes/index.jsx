import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';

// Estruturação do React-Router-Dom proveniente do Stack OverFlow
// source: https://stackoverflow.com/questions/69868956/how-can-i-redirect-in-react-router-v6
export default function FinancialAppRoutes() {
  return (
    <Routes>
       <Route exact path="/" element={ <Login /> } />
       <Route exact path="/register" element={ <Register /> } />
     </Routes>
  );
}
