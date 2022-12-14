import { useEffect, useState } from 'react';
import styles from './styles/ValidatePassword.module.css';

interface ValidatePasswordProps {
  password: string;
}

export default function ValidatePassword({ password }: ValidatePasswordProps) {
  const [length, setLength] = useState(false);
  const [underscore, setUnderscore] = useState(false);
  const [upperscore, setUpperscore] = useState(false);

  useEffect(() => {
    if (password.length >= 8) {
      setLength(true);
    } else {
      setLength(false);
    }

    const regexUnderscore = /(?=.*[a-z])/;
    if (password.match(regexUnderscore)) {
      setUnderscore(true);
    } else {
      setUnderscore(false);
    }

    const regexUpperscore = /(?=.*[A-Z])/;
    if (password.match(regexUpperscore)) {
      setUpperscore(true);
    } else {
      setUpperscore(false);
    }
  }, [password]);
  return (
    <aside
      className={styles.validatePasswordContainer}
      data-testid='validate-password-container'
    >
      <span data-testid='validate-password-message'>
        A senha deve conter pelo menos:
      </span>{' '}
      <span
        data-testid='validate-password-length'
        className={length ? styles.valid : styles.invalid}
      >
        8 caracteres
      </span>
      {', '}
      <span
        data-testid='validate-password-number'
        className={underscore ? styles.valid : styles.invalid}
      >
        um número
      </span>
      {', '}
      <span
        data-testid='validate-password-upper_letter'
        className={upperscore ? styles.valid : styles.invalid}
      >
        uma letra maiúscula
      </span>
      {'.'}
    </aside>
  );
}
