/* eslint-disable testing-library/no-debugging-utils */
// import { screen, waitFor } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import API from '../helpers/api';
import App from '../App';

// Helpers
import { setItem } from '../helpers/localStorage';

// Mocks
import { userMock } from './mocks/user.mock';
import { accountMock } from './mocks/account.mock';
import { transactionsMock } from './mocks/transactions.mock';
import { usersMock } from './mocks/users.mock';

// Data-TestId

describe('Testes da tela de Login', () => {
  it('Verifica o cadastro de novo usuário', async () => {
    setItem('user', userMock);
    jest
      .spyOn(API, 'get')
      .mockResolvedValueOnce({ data: accountMock })
      .mockResolvedValueOnce({ data: transactionsMock })
      .mockResolvedValueOnce({ data: usersMock });

    const { history, debug } = renderWithRouter(<App />, {
      route: `/transactions/${userMock.accountId}`,
    });

    console.log(history.location.pathname);

    debug();
  });
});
