/* eslint-disable testing-library/no-debugging-utils */
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import API from '../helpers/api';
import App from '../App';

// Mocks
import { newUserMock } from './mocks/user.mock';
import { newAccountMock } from './mocks/account.mock';
import { newTransactionsMock } from './mocks/transactions.mock';

// Data-TestId
const REGISTER_TITLE = 'register-title';
const REGISTER_INPUT_USERNAME = 'register-username';
const REGISTER_INPUT_PASSWORD = 'register-password';
const ALERT_REGISTER_ERRO = 'register-alert';
const RETURN_LOGIN_BUTTON = 'return-login-button';
const REGISTER_BUTTON = 'register-button';

const ARRAY_REGISTER_PAGE = [
  REGISTER_TITLE,
  REGISTER_INPUT_USERNAME,
  REGISTER_INPUT_PASSWORD,
  RETURN_LOGIN_BUTTON,
  REGISTER_BUTTON,
];

describe('Testes da tela de Login', () => {
  it('Testa se a página de cadastro é renderizado', async () => {
    const { history } = renderWithRouter(<App />, { route: '/register' });

    expect(history.location.pathname).toBe('/register');
    
    ARRAY_REGISTER_PAGE.forEach((dataTestId) => {
      expect(screen.getByTestId(dataTestId)).toBeInTheDocument();
    });
  });

  it('Verifica o retorno a página de Login', async () => {
    const { history, debug } = renderWithRouter(<App />, { route: '/register' });

    expect(history.location.pathname).toBe('/register');
    
    const returnToLoginButton = screen.getByTestId(RETURN_LOGIN_BUTTON);
    userEvent.click(returnToLoginButton);

    await waitFor(() => expect(history.location.pathname).toBe('/'));
    debug();
  });

  it('Verifica o cadastro de novo usuário', async () => {
    jest.spyOn(API, 'post').mockResolvedValue({
      data: newUserMock,
    });

    jest
      .spyOn(API, 'get')
      .mockResolvedValueOnce({ data: newAccountMock })
      .mockResolvedValue({ data: newTransactionsMock });

    const { history } = renderWithRouter(<App />, { route: '/register' });

    const loginUsername = screen.getByTestId(REGISTER_INPUT_USERNAME);
    const loginPassword = screen.getByTestId(REGISTER_INPUT_PASSWORD);
    const loginButton = screen.getByTestId(REGISTER_BUTTON);

    expect(loginUsername).toBeInTheDocument();
    expect(loginPassword).toBeInTheDocument();
    userEvent.type(loginUsername, 'chandler');
    userEvent.type(loginPassword, 'Rabbit101');
    userEvent.click(loginButton);

    await waitFor(() => expect(localStorage.getItem('user')).not.toBeNull());
    await waitFor(() =>
      expect(history.location.pathname).toBe(
        `/transactions/${newUserMock.accountId}`
      )
    );
  });

  it('Verifica a renderização da mensagem de usuário inválido', async () => {
    jest.spyOn(API, 'post').mockRejectedValue(() => {
      throw new Error('Unauthorized');
    });

    renderWithRouter(<App />, { route: '/register' });

    const loginUsername = screen.getByTestId(REGISTER_INPUT_USERNAME);
    const loginPassword = screen.getByTestId(REGISTER_INPUT_PASSWORD);
    const loginButton = screen.getByTestId(REGISTER_BUTTON);

    expect(loginUsername).toBeInTheDocument();
    expect(loginPassword).toBeInTheDocument();
    userEvent.type(loginUsername, 'chandler');
    userEvent.type(loginPassword, 'Rabbit101');
    userEvent.click(loginButton);

    await screen.findByTestId(ALERT_REGISTER_ERRO);
  });
});
