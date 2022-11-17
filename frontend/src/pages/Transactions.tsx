import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
    </main>
  );
}