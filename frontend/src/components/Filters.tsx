import { useState } from 'react';


// Componentes
import Button from './Button';
import InputDate from './InputDate';
import InputRadio from './InputRadio';

// helpers
import {
  getTransactionsByDate,
  getTransactionsBySearch,
  getTransactionsBySearchAndDate,
  getTransactionsDefault,
} from '../helpers/api';

// Interfaces
import { ITransactions } from '../interfaces/ITransactions';

// Styles
import styles from './styles/Filters.module.css';

interface FiltersProps {
  updateTransactions: (payload: ITransactions[]) => void;
}

export default function Filters({ updateTransactions }: FiltersProps) {
  const [date, setDate] = useState('');
  const [search, setSearch] = useState('');

  const handleFilter = async () => {
    if (search === '' && date === '') {
      const transactions = await getTransactionsDefault();
      return updateTransactions(transactions);
    }
    if (search !== '' && date === '') {
      const transactions = await getTransactionsBySearch(search);
      return updateTransactions(transactions);
    }
    if (search === '' && date !== '') {
      const transactions = await getTransactionsByDate(date);
      return updateTransactions(transactions);
    }
    if (search !== '' && date !== '') {
      const transactions = await getTransactionsBySearchAndDate(search, date);
      return updateTransactions(transactions);
    }
  };

  return (
    <form className={styles.filtersContainer}>
      <InputDate
        id={'date-input'}
        label={''}
        value={date}
        setValue={setDate}
        dataTestId={'date-input'}
      />

      <div className={styles.radioContainer}>
        <InputRadio
          id={'radio-input-all'}
          label={'Todas'}
          value={''}
          setValue={setSearch}
          dataTestId={'radio-input-all'}
        />

        <InputRadio
          id={'radio-input-debit'}
          label={'Débito'}
          value={'debit'}
          setValue={setSearch}
          dataTestId={'radio-input-debit'}
        />

        <InputRadio
          id={'radio-input-credit'}
          label={'Crédito'}
          value={'credit'}
          setValue={setSearch}
          dataTestId={'radio-input-credit'}
        />
      </div>
      <Button
        text={'Filtrar'}
        type={'button'}
        disabled={false}
        handleSubmit={() => {
          handleFilter();
          setDate('');
          setSearch('');
        }}
        dataTestId={'filter-button'}
        buttonClass={ styles.filterButton }
      />
    </form>
  );
}
