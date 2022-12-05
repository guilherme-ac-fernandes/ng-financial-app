/* eslint-disable testing-library/no-debugging-utils */
// import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import API from '../helpers/api';
import App from '../App';

// Mocks
import { userMock } from './mocks/user.mock';
import { accountMock } from './mocks/account.mock';
import { transactionsMock } from './mocks/transactions.mock';

// Data-TestId
const LOGIN_TITLE = 'login-title';
const LOGIN_INPUT_USERNAME = 'login-username';
const LOGIN_INPUT_PASSWORD = 'login-password';
const ALERT_USER_NOT_FOUNT = 'login-alert';
const REGISTER_BUTTON = 'login-register-button';
const LOGIN_BUTTON = 'login-button';
const VALIDATE_PASSWORD_CONTAINER = 'validate-password-container';
const VALIDATE_PASSWORD_MESSAGE = 'validate-password-message';
const VALIDATE_PASSWORD_LENGTH = 'validate-password-length';
const VALIDATE_PASSWORD_NUMBER = 'validate-password-number';
const VALIDATE_PASSWORD_UPPER_LETTER = 'validate-password-upper_letter';

const ARRAY_LOGIN_PAGE = [
  LOGIN_TITLE,
  LOGIN_INPUT_USERNAME,
  LOGIN_INPUT_PASSWORD,
  REGISTER_BUTTON,
  LOGIN_BUTTON,
];

const ARRAY_VALIDATE_PASSWORD = [
  VALIDATE_PASSWORD_CONTAINER,
  VALIDATE_PASSWORD_MESSAGE,
  VALIDATE_PASSWORD_LENGTH,
  VALIDATE_PASSWORD_NUMBER,
  VALIDATE_PASSWORD_UPPER_LETTER,
];

describe('Testes da tela de Login', () => {
  it('Testa se a tela de login é renderizada na rota esperada', () => {
    const { history } = renderWithRouter(<App />);

    expect(history.location.pathname).toBe('/');
    ARRAY_LOGIN_PAGE.forEach((dataTestId) => {
      expect(screen.getByTestId(dataTestId)).toBeInTheDocument();
    });
  });

  it('Testa a renderização do componente de validação da senha', () => {
    renderWithRouter(<App />);

    const loginTitle = screen.getByTestId(LOGIN_TITLE);
    const loginPassword = screen.getByTestId(LOGIN_INPUT_PASSWORD);
    const lengthSpan = screen.getByTestId(VALIDATE_PASSWORD_LENGTH);
    const numberSpan = screen.getByTestId(VALIDATE_PASSWORD_NUMBER);
    const upperLetterSpan = screen.getByTestId(VALIDATE_PASSWORD_UPPER_LETTER);

    expect(loginTitle).toBeInTheDocument();
    ARRAY_VALIDATE_PASSWORD.forEach((dataTestId) => {
      expect(screen.getByTestId(dataTestId)).toBeInTheDocument();
    });

    expect(lengthSpan).toHaveClass('invalid');
    expect(numberSpan).toHaveClass('invalid');
    expect(upperLetterSpan).toHaveClass('invalid');
    userEvent.type(loginPassword, 'Pillow1234');
    expect(lengthSpan).toHaveClass('valid');
    expect(numberSpan).toHaveClass('valid');
    expect(upperLetterSpan).toHaveClass('valid');
  });

  it('Verifica a realização do login do usuário já criado', async () => {
    jest.spyOn(API, 'post').mockResolvedValue({
      data: userMock,
    });

    jest
      .spyOn(API, 'get')
      .mockResolvedValueOnce({ data: accountMock })
      .mockResolvedValue({ data: transactionsMock });

    const { history } = renderWithRouter(<App />);

    const loginUsername = screen.getByTestId(LOGIN_INPUT_USERNAME);
    const loginPassword = screen.getByTestId(LOGIN_INPUT_PASSWORD);
    const loginButton = screen.getByTestId(LOGIN_BUTTON);

    expect(loginUsername).toBeInTheDocument();
    expect(loginPassword).toBeInTheDocument();
    userEvent.type(loginUsername, 'lilipad');
    userEvent.type(loginPassword, 'Pillow1234');
    userEvent.click(loginButton);

    await waitFor(() => expect(localStorage.getItem('user')).not.toBeNull());
    await waitFor(() =>
      expect(history.location.pathname).toBe(
        `/transactions/${userMock.accountId}`
      )
    );
  });

  it('Verifica a renderização da mensagem de usuário inválido', async () => {
    jest.spyOn(API, 'post').mockRejectedValue(() => {
      throw new Error('Unauthorized');
    });

    renderWithRouter(<App />);

    const loginUsername = screen.getByTestId(LOGIN_INPUT_USERNAME);
    const loginPassword = screen.getByTestId(LOGIN_INPUT_PASSWORD);
    const loginButton = screen.getByTestId(LOGIN_BUTTON);

    expect(loginUsername).toBeInTheDocument();
    expect(loginPassword).toBeInTheDocument();
    userEvent.type(loginUsername, 'wrong-user');
    userEvent.type(loginPassword, 'user1234Wrong');
    userEvent.click(loginButton);

    await screen.findByTestId(ALERT_USER_NOT_FOUNT);
  });

  it('Verifica a renderização da tela de login ao clicar no botão', async () => {
    const { history } = renderWithRouter(<App />);

    const registerButton = screen.getByTestId(REGISTER_BUTTON);
    expect(registerButton).toBeInTheDocument();
    userEvent.click(registerButton);

    await waitFor(() => expect(history.location.pathname).toBe('/register'));
  });
});
