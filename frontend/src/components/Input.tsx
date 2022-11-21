interface InputProps {
  id: string,
  label: string,
  type: 'text' | 'password' | 'number',
  value: string,
  setValue: (value: string) => void,
  dataTestId: string,
  placeholder: string,
}

export default function Input({
  id,
  label,
  type,
  value,
  setValue,
  dataTestId,
  placeholder,
}: InputProps) {
  return (
    <label htmlFor={ id }>
      { label }
      <input
        id={ id }
        className='login_input'
        type={ type }
        value={ value }
        onChange={ ({ target }) => setValue(target.value) }
        data-testid={ dataTestId }
        placeholder={ placeholder }
      />
    </label>
  );
}
