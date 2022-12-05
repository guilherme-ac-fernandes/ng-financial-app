import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';

// Componentes
import Input from './Input';
import Select from './Select';

// helpers
import { createTransactions, getUser } from '../helpers/api';
import { getItem } from '../helpers/localStorage';

// Interfaces
import { IUser } from '../interfaces/IUser';

// Styles
import styles from './styles/TransactionModal.module.css';

interface TransactionModalProps {
  axiosRequest: () => void;
}

export default function TransactionModal({
  axiosRequest,
}: TransactionModalProps) {
  const [show, setShow] = useState(false);
  const [users, setUsers] = useState<IUser[]>([]);
  const [creditedAccountId, setCreditedAccountId] = useState('');
  const [value, setValue] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [invalidTransactionAlert, setInvalidTransactionAlert] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      const allUsers = (await getUser()) as unknown as IUser[];
      const { username } = getItem('user') as unknown as IUser;
      setUsers(allUsers.filter((user) => user.username !== username));
    };
    getUsers();
  }, []);

  useEffect(() => {
    if (creditedAccountId !== '' && value !== '') {
      return setIsDisabled(false);
    }
    return setIsDisabled(true);
  }, [creditedAccountId, value, setIsDisabled]);

  const handleClose = () => {
    setCreditedAccountId('');
    setValue('');
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const handleSubmit = async () => {
    try {
      setInvalidTransactionAlert(false);
      await createTransactions(Number(creditedAccountId), value);
      setCreditedAccountId('');
      setValue('');
      handleClose();
      axiosRequest();
    } catch (error) {
      setInvalidTransactionAlert(true);
    }
  };

  return (
    <section className={styles.modalContainer}>
      <button onClick={handleShow} className={styles.openModalButton}>
        <span>Nova Transação</span>
      </button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop='static'
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>Nova Transação</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <Select
              id={'select-new-transaction'}
              label={'Transferência para:'}
              value={creditedAccountId}
              setValue={setCreditedAccountId}
              dataTestId={'select-new-transaction'}
              users={users}
            />
            <Input
              id={'value-new-transaction'}
              label={'Valor:'}
              type={'number'}
              value={value}
              setValue={setValue}
              dataTestId={'value-new-transaction'}
              placeholder={'Exemplo: 10 reais'}
            />
          </form>
          {invalidTransactionAlert && (
            <p className={styles.modalAlert}>
              Transação cancelada, valor maior que saldo da conta.
            </p>
          )}
        </Modal.Body>
        <Modal.Footer className={styles.buttonContainer}>
          <button className={styles.modalButton} onClick={handleClose}>
            Cancelar
          </button>
          <button
            className={styles.modalButton}
            disabled={isDisabled}
            onClick={handleSubmit}
          >
            Transferir
          </button>
        </Modal.Footer>
      </Modal>
    </section>
  );
}
