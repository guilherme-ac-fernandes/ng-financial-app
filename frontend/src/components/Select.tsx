import { IUser } from '../interfaces/IUser';

interface InputProps {
  id: string;
  label: string;
  value: string;
  setValue: (value: string) => void;
  dataTestId: string;
  users: IUser[];
}

export default function Select({
  id,
  label,
  value,
  setValue,
  dataTestId,
  users,
}: InputProps) {
  return (
    <label htmlFor={id}>
      {label}
      <select
        id={id}
        className='select_input'
        value={value}
        onChange={({ target }) => setValue(target.value)}
        data-testid={dataTestId}
      >
        <option value='default'>Selecionar</option>
        {users.length > 0 &&
          users.map(({ username, accountId }) => (
            <option key={`user-option-${accountId}`} value={accountId}>
              {username}
            </option>
          ))}
      </select>
    </label>
  );
}
