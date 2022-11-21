import styles from './styles/Input.module.css';

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
    <label htmlFor={ id } className={styles.labelContainer}>
      { label }
      <input
        id={ id }
        className={styles.inputContainer}
        type={ type }
        value={ value }
        onChange={ ({ target }) => setValue(target.value) }
        data-testid={ dataTestId }
        placeholder={ placeholder }
        min='0'
      />
    </label>
  );
}
