import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

test('Farewell, front-end', () => {
  renderWithRouter(<App />);
  const inputEmail = screen.getByTestId('email-input');
  const inputPass = screen.getByTestId('password-input');
  const btnEnviar = screen.getByTestId('login-submit-btn');

  expect(inputEmail).toBeInTheDocument();
  expect(inputPass).toBeInTheDocument();
  expect(btnEnviar).toBeInTheDocument();
});
test('login', () => {
  renderWithRouter(<App />);
  const inputEmail = screen.getByTestId('email-input');
  const inputPass = screen.getByTestId('password-input');
  const btnEnviar = screen.getByTestId('login-submit-btn');

  userEvent.type(inputEmail, 'test@test.com');
  userEvent.type(inputPass, '1234567');
  userEvent.click(btnEnviar);
});
