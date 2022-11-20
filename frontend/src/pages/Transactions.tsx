import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

export default function Transactions() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('user')) {
      return navigate('/');
    }
  }, [navigate]);

  return (
    <main>
      <h1>Transactions</h1>
      <Header />
    </main>
  );
}