interface InputRadioProps {
  id: string;
  label: string;
  value: string;
  setValue: (value: string) => void;
  dataTestId: string;
}

export default function InputRadio({
  id,
  label,
  value,
  setValue,
  dataTestId,
}: InputRadioProps) {
  return (
    <label htmlFor={id}>
      {label}
      <input
        id={id}
        className='radio_input'
        type='radio'
        name='search'
        value={value}
        onChange={({ target }) => setValue(target.value)}
        data-testid={dataTestId}
      />
    </label>
  );
}
