interface ButtonProps {
  text: string;
  type: 'submit' | 'button';
  handleSubmit: () => void;
  disabled: boolean,
  dataTestId: string;
}

export default function Button({
  text,
  type,
  handleSubmit,
  disabled,
  dataTestId,
}: ButtonProps) {
  return (
    <button
      type={ type }
      onClick={ handleSubmit }
      disabled={ disabled }
      data-testid={ dataTestId }
    >
      { text }
    </button>
  );
}
