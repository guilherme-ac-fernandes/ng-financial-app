import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { getUser } from '../helpers/api';
import { IUser } from '../interfaces/IUser';
import Input from './Input';
import Select from './Select';

export default function TransactionModal() {
  const [show, setShow] = useState(false);
  const [users, setUsers] = useState<IUser[]>([]);
  const [select, setSelect] = useState('');
  const [value, setValue] = useState('');

  useEffect(() => {
    const getUsers = async () => {
      const allUsers = (await getUser()) as unknown as IUser[];
      setUsers(allUsers);
    };
    getUsers();
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button onClick={handleShow}>
        <span className='material-symbols-outlined'>add</span>
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
              value={ select }
              setValue={ setSelect }
              dataTestId={'select-new-transaction'}
              users={ users }
            />
            <Input
              id={'value-new-transaction'}
              label={'Valor:'}
              type={'number'}
              value={value}
              setValue={ setValue }
              dataTestId={'value-new-transaction'}
              placeholder={'username'}
            />
              
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleClose}>Fechar</button>
          <button>Salvar</button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
