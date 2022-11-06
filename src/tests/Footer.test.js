import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import React from 'react';
// import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import Footer from '../components/Footer';

describe('Tests the Footer component', () => {
  it('Tests if components render correctly', async () => {
    global.fetch = jest.fn(fetch);

    await act(async () => {
      renderWithRouter(<Footer />);
    });

    const btnDrinks = screen.getByTestId('drinks-bottom-btn');
    const btnFood = screen.getByTestId('meals-bottom-btn');

    expect(btnFood).toBeInTheDocument();
    expect(btnDrinks).toBeInTheDocument();
  });

  // it('Tests if Footer can be redirect to meals or drinks', async () => {
  //   global.fetch = jest.fn(fetch);
  //   let history;

  //   await act(async () => {
  //     const result = renderWithRouter(<App />, '/meals');
  //     history = result.history;
  //   });

  //   const btnDrinks = screen.getByTestId('drinks-bottom-btn');

  //   userEvent.click(btnDrinks);
  //   expect(history.location.pathname).toBe('/drinks');
  //   const imgDrinks = screen.getByRole('img', { name: /drink/i });
  //   expect(imgDrinks).toHaveAttribute('src', 'drinkIcon.svg');
  // });

  // it('Tests if Footer can be redirect to foods or drinks', async () => {
  //   global.fetch = jest.fn(fetch);
  //   let history;

  //   await act(async () => {
  //     const result = renderWithRouter(<App />, '/drinks');
  //     history = result.history;
  //   });

  //   const btnFood = screen.getByTestId('meals-bottom-btn');

  //   userEvent.click(btnFood);
  //   expect(history.location.pathname).toBe('/foods');
  //   const imgDrinks = screen.getByRole('img', { name: /drink/i });
  //   expect(imgDrinks).toHaveAttribute('src', 'drinkIcon.svg');
  // });
});
