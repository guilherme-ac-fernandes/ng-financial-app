/* eslint-disable testing-library/no-debugging-utils */
import {
  screen,
  waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import API from '../helpers/api';
import App from '../App';

// Mocks
import { userMock } from './mocks/user.mock';
import { accountMock } from './mocks/account.mock';
import { transactionsMock } from './mocks/transactions.mock';
import { usersMock } from './mocks/users.mock';
// import Transactions from '../pages/Transactions';
// import TransactionModal from '../components/TransactionModal';
// import { setItem } from '../helpers/localStorage';

// Data-TestId
const LOGIN_INPUT_USERNAME = 'login-username';
const LOGIN_INPUT_PASSWORD = 'login-password';
const LOGIN_BUTTON = 'login-button';

const HEADER_TITLE = 'header_title';
const LOADING = 'loading-element';

describe('Testes da tela de Login', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('Verifica renderização da rota correta após o Login', async () => {
    jest.spyOn(API, 'post').mockResolvedValue({
      data: userMock,
    });

    jest
      .spyOn(API, 'get')
      .mockResolvedValueOnce({ data: accountMock })
      .mockResolvedValueOnce({ data: transactionsMock })
      .mockResolvedValue({ data: usersMock });

    const { history, debug } = renderWithRouter(<App />);

    const loginUsername = screen.getByTestId(LOGIN_INPUT_USERNAME);
    const loginPassword = screen.getByTestId(LOGIN_INPUT_PASSWORD);
    const loginButton = screen.getByTestId(LOGIN_BUTTON);
    userEvent.type(loginUsername, 'lilipad');
    userEvent.type(loginPassword, 'Pillow1234');
    userEvent.click(loginButton);

    await waitFor(() => expect(localStorage.getItem('user')).not.toBeNull());
    await waitFor(() =>
      expect(history.location.pathname).toBe(
        `/transactions/${userMock.accountId}`
      )
    );

    await waitFor(() =>
      expect(screen.queryByTestId(LOADING)).not.toBeInTheDocument()
    );
    await screen.findByTestId(HEADER_TITLE);
    debug();
  });

  // it('Renderização da tela de usuário', async () => {
  //   setItem('user', userMock);

  //   jest
  //     .spyOn(API, 'get')
  //     .mockResolvedValueOnce({ data: accountMock })
  //     .mockResolvedValueOnce({ data: accountMock })
  //     .mockResolvedValueOnce({ data: transactionsMock })
  //     .mockResolvedValueOnce({ data: transactionsMock })
  //     .mockResolvedValue({ data: usersMock });

  //   const { history, debug } = renderWithRouter(<App />, {
  //     route: `/transactions/${userMock.accountId}`,
  //   });

  //   console.log(history.location.pathname);

  //   debug();
  // });
});
