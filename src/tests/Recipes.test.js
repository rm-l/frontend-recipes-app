import React from 'react';
import { screen/* , waitFor */ } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import { mockMealCategories } from './helpers/mockData';

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

    const btnCat01 = screen.getByTestId('Beef-category-filter');
    const btnCat02 = screen.getByTestId('Breakfast-category-filter');
    const btnCat03 = screen.getByTestId('Chicken-category-filter');
    const btnCat04 = screen.getByTestId('Dessert-category-filter');
    const btnCat05 = screen.getByTestId('Goat-category-filter');

    expect(btnCat01).toBeInTheDocument();
    expect(btnCat02).toBeInTheDocument();
    expect(btnCat03).toBeInTheDocument();
    expect(btnCat04).toBeInTheDocument();
    expect(btnCat05).toBeInTheDocument();
  });
});
