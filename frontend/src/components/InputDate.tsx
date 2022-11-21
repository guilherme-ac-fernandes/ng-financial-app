interface InputDateProps {
  id: string,
  label: string,
  value: string,
  setValue: (value: string) => void,
  dataTestId: string,
}

export default function InputDate({
  id,
  label,
  value,
  setValue,
  dataTestId,
}: InputDateProps) {
  return (
    <label htmlFor={ id }>
      { label }
      <input
        id={ id }
        className='date_input'
        type='date'
        value={ value }
        onChange={ ({ target }) => setValue(target.value) }
        data-testid={ dataTestId }
      />
    </label>
  );
}
