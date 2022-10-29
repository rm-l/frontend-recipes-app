import React from 'react';
import { screen/* , waitFor */ } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
// import { mockMealCategories, mockDrinkCategories } from './helpers/mockData';
import fetch from '../../cypress/mocks/fetch';

describe('RecipeInProgress tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test('Composição da página em meals/52771/in-progress', async () => {
    global.fetch = jest.fn(fetch);

    await act(async () => {
      renderWithRouter(<App />, '/meals/52771/in-progress');
    });

    const title = screen.getByTestId('recipe-title');
    const shareBtn = screen.getByTestId('share-btn');
    const favoriteBtn = screen.getByTestId('finish-recipe-btn');
    const photo = screen.getByTestId('recipe-photo');
    const category = screen.getByTestId('recipe-category');
    const instructions = screen.getByTestId('instructions');
    const ingredient0 = screen.getByTestId('0-ingredient-step');

    expect(title).toBeInTheDocument();
    expect(shareBtn).toBeInTheDocument();
    expect(favoriteBtn).toBeInTheDocument();
    expect(photo).toBeInTheDocument();
    expect(category).toBeInTheDocument();
    expect(instructions).toBeInTheDocument();
    expect(ingredient0).toBeInTheDocument();
  });
  test('Composição da página em drinks/178319/in-progress', async () => {
    global.fetch = jest.fn(fetch);

    await act(async () => {
      renderWithRouter(<App />, '/drinks/178319/in-progress');
    });

    const title = screen.getByTestId('recipe-title');
    const shareBtn = screen.getByTestId('share-btn');
    const favoriteBtn = screen.getByTestId('finish-recipe-btn');
    const photo = screen.getByTestId('recipe-photo');
    const category = screen.getByTestId('recipe-category');
    const instructions = screen.getByTestId('instructions');
    const ingredient0 = screen.getByTestId('0-ingredient-step');

    expect(title).toBeInTheDocument();
    expect(shareBtn).toBeInTheDocument();
    expect(favoriteBtn).toBeInTheDocument();
    expect(photo).toBeInTheDocument();
    expect(category).toBeInTheDocument();
    expect(instructions).toBeInTheDocument();
    expect(ingredient0).toBeInTheDocument();
  });
});
