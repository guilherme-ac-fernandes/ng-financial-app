import TransactionModal from "./TransactionModal";

interface DisplayUserProps {
  username?: string;
  balance?: string;
}

export default function DisplayUser({ username, balance }: DisplayUserProps) {
  return (
    <header>
      <h2>{username}</h2>
      <p>{balance}</p>
      <TransactionModal />
    </header>
  );
}
