/* eslint-disable testing-library/no-debugging-utils */
import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';


describe('Testes da tela de Login', () => {

  it('Testa se a tela de login é renderizada na rota esperada', () => {
    const { history, debug } = renderWithRouter(<App />);
    console.log(history.location.pathname);
    
    expect(screen.getByText(/NG_CASH/i)).toBeInTheDocument();
    expect(screen.queryByText(/CADASTRO/i)).not.toBeInTheDocument();
    debug();
  });
  
});