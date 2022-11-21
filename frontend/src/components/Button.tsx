import styles from './styles/Button.module.css';

interface ButtonProps {
  text: string;
  type: 'submit' | 'button';
  handleSubmit: () => void;
  disabled: boolean,
  dataTestId: string;
  buttonClass?: string,
}

export default function Button({
  text,
  type,
  handleSubmit,
  disabled,
  dataTestId,
  buttonClass,
}: ButtonProps) {
  return (
    <button
      className={`${styles.buttonContainer} ${buttonClass || ''}`}
      type={ type }
      onClick={ handleSubmit }
      disabled={ disabled }
      data-testid={ dataTestId }
    >
      { text }
    </button>
  );
}
