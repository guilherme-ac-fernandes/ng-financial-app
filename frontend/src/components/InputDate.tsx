import styles from './styles/InputDate.module.css';

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
    <label htmlFor={ id } className={styles.labelContainer}>
      { label }
      <input
        id={ id }
        className={styles.inputContainer}
        type='date'
        value={ value }
        onChange={ ({ target }) => setValue(target.value) }
        data-testid={ dataTestId }
      />
    </label>
  );
}
