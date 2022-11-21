import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { createTransactions, getUser } from '../helpers/api';
import { IUser } from '../interfaces/IUser';
import Input from './Input';
import Select from './Select';

interface TransactionModalProps {
  axiosRequest: () => void;
}

export default function TransactionModal({ axiosRequest }: TransactionModalProps) {
  const [show, setShow] = useState(false);
  const [users, setUsers] = useState<IUser[]>([]);
  const [creditedAccountId, setCreditedAccountId] = useState('');
  const [value, setValue] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [invalidTransactionAlert, setInvalidTransactionAlert] = useState(false);


  useEffect(() => {
    const getUsers = async () => {
      const allUsers = (await getUser()) as unknown as IUser[];
      setUsers(allUsers);
    };
    getUsers();
  }, []);

  useEffect(() => {
    if (creditedAccountId !== '' && value !== '') {
      return setIsDisabled(false);
    }
    return setIsDisabled(true);
  }, [creditedAccountId, value, setIsDisabled]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = async () => {
    try {
      setInvalidTransactionAlert(false);
      await createTransactions(Number(creditedAccountId), value);
      handleClose();
      axiosRequest();
    } catch (error) {
      setInvalidTransactionAlert(true);
    }
  };

  return (
    <section>
      <button onClick={handleShow}>
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
              placeholder={'username'}
            />
          </form>
          {invalidTransactionAlert && <p>Transação cancelada, valor maior que saldo da conta.</p>}
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleClose}>Cancelar</button>
          <button disabled={isDisabled} onClick={handleSubmit}>
            Transferir
          </button>
        </Modal.Footer>
      </Modal>
    </section>
  );
}
