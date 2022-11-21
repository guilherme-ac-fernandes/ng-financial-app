import TransactionModal from "./TransactionModal";

interface DisplayUserProps {
  username?: string;
  balance?: string;
  axiosRequest: () => void;
}

export default function DisplayUser({ username, balance, axiosRequest }: DisplayUserProps) {
  return (
    <header>
      <h2>{username}</h2>
      <p>{balance}</p>
      <TransactionModal axiosRequest={axiosRequest} />
    </header>
  );
}
