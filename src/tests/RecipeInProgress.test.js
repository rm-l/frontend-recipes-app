import React from 'react';
import { screen, /* , waitFor */
  waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import copy from 'clipboard-copy';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
// import { mockMealCategories, mockDrinkCategories } from './helpers/mockData';
import fetch from '../../cypress/mocks/fetch';

const share = 'share-btn';
const favorite = 'favorite-btn';
const finish = 'finish-recipe-btn';
const mealsEndPoint = '/meals/52771/in-progress';
const drinksEndPoint = '/drinks/178319/in-progress';

jest.mock('clipboard-copy');
describe('RecipeInProgress tests', () => {
  const { location } = window;
  beforeAll(() => {
    delete window.location;
    window.location = { reload: jest.fn() };
  });
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    window.location = location;
  });
  test('Composição da página em meals/52771/in-progress', async () => {
    global.fetch = jest.fn(fetch);

    await act(async () => {
      renderWithRouter(<App />, mealsEndPoint);
    });

    const shareBtn = screen.getByTestId(share);
    const favoriteBtn = screen.getByTestId(favorite);
    const finishBtn = screen.getByTestId(finish);
    const title = screen.getByTestId('recipe-title');
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
    expect(finishBtn).toBeInTheDocument();
  });
  test('Testes dos botões na página em meals/52771/in-progress', async () => {
    global.fetch = jest.fn(fetch);
    copy.mockImplementation(() => {});

    await act(async () => {
      renderWithRouter(<App />, mealsEndPoint);
    });

    const shareBtn = screen.getByTestId(share);
    const favoriteBtn = screen.getByTestId(favorite);
    const finishBtn = screen.getByTestId(finish);

    userEvent.click(favoriteBtn);
    userEvent.click(favoriteBtn);
    userEvent.click(shareBtn);

    // expect(finishBtn).toBeDisabled();

    const ingredient0 = screen.getByTestId('0-ingredient-step-check');
    const ingredient1 = screen.getByTestId('1-ingredient-step-check');
    const ingredient2 = screen.getByTestId('2-ingredient-step-check');
    const ingredient3 = screen.getByTestId('3-ingredient-step-check');
    const ingredient4 = screen.getByTestId('4-ingredient-step-check');
    const ingredient5 = screen.getByTestId('5-ingredient-step-check');
    const ingredient6 = screen.getByTestId('6-ingredient-step-check');
    const ingredient7 = screen.getByTestId('7-ingredient-step-check');

    userEvent.click(ingredient0);
    userEvent.click(ingredient0);
    userEvent.click(ingredient0);
    userEvent.click(ingredient1);
    userEvent.click(ingredient2);
    userEvent.click(ingredient3);
    userEvent.click(ingredient4);
    userEvent.click(ingredient5);
    userEvent.click(ingredient6);
    userEvent.click(ingredient7);

    waitFor(() => { expect(finishBtn).toBeEnabled(); });

    userEvent.click(finishBtn);

    expect(jest.isMockFunction(window.location.reload)).toBe(true);
    window.location.reload();
    expect(window.location.reload).toHaveBeenCalled();
  });
  test('Promise Reject drinks', async () => {
    global.fetch = jest.fn(() => Promise.reject(new Erro('Error')));

    await act(async () => {
      renderWithRouter(<App />, mealsEndPoint);
    });
  });

  test('Composição da página em drinks/178319/in-progress', async () => {
    global.fetch = jest.fn(fetch);

    await act(async () => {
      renderWithRouter(<App />, drinksEndPoint);
    });

    const shareBtn = screen.getByTestId(share);
    const favoriteBtn = screen.getByTestId(favorite);
    const finishBtn = screen.getByTestId(finish);
    const title = screen.getByTestId('recipe-title');
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
    expect(finishBtn).toBeInTheDocument();
  });
  test('Testes dos botões na página em drinks/178319/in-progress', async () => {
    global.fetch = jest.fn(fetch);

    await act(async () => {
      renderWithRouter(<App />, drinksEndPoint);
    });

    const shareBtn = screen.getByTestId(share);
    const favoriteBtn = screen.getByTestId(favorite);
    const finishBtn = screen.getByTestId(finish);

    userEvent.click(favoriteBtn);
    userEvent.click(favoriteBtn);
    userEvent.click(shareBtn);

    // expect(finishBtn).toBeDisabled();

    const ingredient0 = screen.getByTestId('0-ingredient-step-check');
    const ingredient1 = screen.getByTestId('1-ingredient-step-check');
    const ingredient2 = screen.getByTestId('2-ingredient-step-check');

    userEvent.click(ingredient0);
    waitFor(() => expect(ingredient0).toBeChecked());
    userEvent.click(ingredient0);
    userEvent.click(ingredient0);
    userEvent.click(ingredient1);
    userEvent.click(ingredient2);

    waitFor(() => { expect(finishBtn).toBeEnabled(); });

    userEvent.click(finishBtn);

    expect(jest.isMockFunction(window.location.reload)).toBe(true);
    window.location.reload();
    expect(window.location.reload).toHaveBeenCalled();
  });
  test('Promise Reject drinks', async () => {
    global.fetch = jest.fn(() => Promise.reject(new Erro('Error')));

    await act(async () => {
      renderWithRouter(<App />, drinksEndPoint);
    });
  });
});
