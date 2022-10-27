import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import { mockMealCategories, mockDrinkCategories } from './helpers/mockData';
import fetch from '../../cypress/mocks/fetch';

const allFilter = 'All-category-filter';

describe('Recipes.js testes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test('Composição da página em /meals', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockMealCategories),
    });

    await act(async () => {
      renderWithRouter(<App />, '/meals');
    });

    const btnALL = screen.getByTestId(allFilter);
    const btnCat01 = screen.getByTestId('Beef-category-filter');
    const btnCat02 = screen.getByTestId('Breakfast-category-filter');
    const btnCat03 = screen.getByTestId('Chicken-category-filter');
    const btnCat04 = screen.getByTestId('Dessert-category-filter');
    const btnCat05 = screen.getByTestId('Goat-category-filter');

    expect(btnALL).toBeInTheDocument();
    expect(btnCat01).toBeInTheDocument();
    expect(btnCat02).toBeInTheDocument();
    expect(btnCat03).toBeInTheDocument();
    expect(btnCat04).toBeInTheDocument();
    expect(btnCat05).toBeInTheDocument();
  });
  test('Teste click primeira categoria meals', async () => {
    global.fetch = jest.fn(fetch);

    await act(async () => {
      renderWithRouter(<App />, '/meals');
    });

    const btnCat01 = await screen.findByTestId('Beef-category-filter');

    userEvent.click(btnCat01);

    await waitFor(() => expect(screen.getByText(/beef and mustard pie/i)).toBeInTheDocument());

    userEvent.click(btnCat01);
  });
  test('Click all category em /meals', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockMealCategories),
    });

    await act(async () => {
      renderWithRouter(<App />, '/meals');
    });

    const btnCat01 = screen.getByTestId(allFilter);

    userEvent.click(btnCat01);
  });
  test('Composição da página em /drinks', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockDrinkCategories),
    });

    await act(async () => {
      renderWithRouter(<App />, '/drinks');
    });

    const btnALL = screen.getByTestId(allFilter);
    const btnCat01 = screen.getByTestId('Ordinary Drink-category-filter');
    const btnCat02 = screen.getByTestId('Cocktail-category-filter');
    const btnCat03 = screen.getByTestId('Shake-category-filter');
    const btnCat04 = screen.getByTestId('Other/Unknown-category-filter');
    const btnCat05 = screen.getByTestId('Cocoa-category-filter');

    expect(btnALL).toBeInTheDocument();
    expect(btnCat01).toBeInTheDocument();
    expect(btnCat02).toBeInTheDocument();
    expect(btnCat03).toBeInTheDocument();
    expect(btnCat04).toBeInTheDocument();
    expect(btnCat05).toBeInTheDocument();
  });
  test('Teste click primeira categoria drinks', async () => {
    global.fetch = jest.fn(fetch);

    await act(async () => {
      renderWithRouter(<App />, '/drinks');
    });

    const btnCat01 = await screen.findByTestId('Ordinary Drink-category-filter');

    userEvent.click(btnCat01);

    await waitFor(() => expect(screen.getByText(/3-mile long island iced tea/i)).toBeInTheDocument());

    userEvent.click(btnCat01);
  });
  test('Click all category em /drinks', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockDrinkCategories),
    });

    await act(async () => {
      renderWithRouter(<App />, '/drinks');
    });

    const btnCat01 = screen.getByTestId(allFilter);

    userEvent.click(btnCat01);
  });
});
