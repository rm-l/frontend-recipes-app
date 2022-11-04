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

const finish = 'finish-recipe-btn';
// const mealsEndPoint = '/meals/52771';
const mealsInProgressEndPoint = '/meals/52771/in-progress';
// const drinksEndPoint = '/drinks/178319';
const drinksInProgressEndPoint = '/drinks/178319/in-progress';

jest.mock('clipboard-copy');

describe('Test para DoneRecipes page', () => {
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
  test('Composição da página depois de terminar um meal', async () => {
    global.fetch = jest.fn(fetch);
    copy.mockImplementation(() => {});

    await act(async () => {
      renderWithRouter(<App />, mealsInProgressEndPoint);
    });

    const finishBtn = screen.getByTestId(finish);

    const ingredient0 = screen.getByTestId('0-ingredient-step-check');
    const ingredient1 = screen.getByTestId('1-ingredient-step-check');
    const ingredient2 = screen.getByTestId('2-ingredient-step-check');
    const ingredient3 = screen.getByTestId('3-ingredient-step-check');
    const ingredient4 = screen.getByTestId('4-ingredient-step-check');
    const ingredient5 = screen.getByTestId('5-ingredient-step-check');
    const ingredient6 = screen.getByTestId('6-ingredient-step-check');
    const ingredient7 = screen.getByTestId('7-ingredient-step-check');

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

    const allBtn = screen.getByTestId('filter-by-all-btn');
    const mealBtn = screen.getByTestId('filter-by-meal-btn');
    const drinkBtn = screen.getByTestId('filter-by-drink-btn');
    const imgMeal = screen.getByTestId('0-horizontal-image');
    const shareBtn = screen.getByTestId('0-horizontal-share-btn');

    const name = screen.getByTestId('0-horizontal-name');

    const topText = screen.getByTestId('0-horizontal-top-text');
    const date = screen.getByTestId('0-horizontal-done-date');

    expect(allBtn).toBeInTheDocument();
    expect(mealBtn).toBeInTheDocument();
    expect(drinkBtn).toBeInTheDocument();
    expect(imgMeal).toBeInTheDocument();
    expect(shareBtn).toBeInTheDocument();
    expect(topText).toBeInTheDocument();
    expect(name).toBeInTheDocument();
    expect(date).toBeInTheDocument();

    userEvent.click(drinkBtn);
    userEvent.click(mealBtn);
    userEvent.click(allBtn);
    userEvent.click(shareBtn);
    userEvent.click(imgMeal);
  });

  test('Composição da página depois de terminar um meal', async () => {
    global.fetch = jest.fn(fetch);
    copy.mockImplementation(() => {});

    await act(async () => {
      renderWithRouter(<App />, drinksInProgressEndPoint);
    });

    const finishBtn = screen.getByTestId(finish);

    const ingredient0 = screen.getByTestId('0-ingredient-step-check');
    const ingredient1 = screen.getByTestId('1-ingredient-step-check');
    const ingredient2 = screen.getByTestId('2-ingredient-step-check');

    userEvent.click(ingredient0);
    userEvent.click(ingredient1);
    userEvent.click(ingredient2);

    waitFor(() => { expect(finishBtn).toBeEnabled(); });

    userEvent.click(finishBtn);

    expect(jest.isMockFunction(window.location.reload)).toBe(true);
    window.location.reload();
    expect(window.location.reload).toHaveBeenCalled();

    const allBtn = screen.getByTestId('filter-by-all-btn');
    const mealBtn = screen.getByTestId('filter-by-meal-btn');
    const drinkBtn = screen.getByTestId('filter-by-drink-btn');
    const imgDrink = screen.getByTestId('0-horizontal-image');
    const shareBtn = screen.getByTestId('0-horizontal-share-btn');

    const name = screen.getByTestId('0-horizontal-name');

    const topText = screen.getByTestId('0-horizontal-top-text');
    const date = screen.getByTestId('0-horizontal-done-date');

    expect(allBtn).toBeInTheDocument();
    expect(mealBtn).toBeInTheDocument();
    expect(drinkBtn).toBeInTheDocument();
    expect(imgDrink).toBeInTheDocument();
    expect(shareBtn).toBeInTheDocument();
    expect(topText).toBeInTheDocument();
    expect(name).toBeInTheDocument();
    expect(date).toBeInTheDocument();

    userEvent.click(drinkBtn);
    userEvent.click(mealBtn);
    userEvent.click(allBtn);
    userEvent.click(shareBtn);
    userEvent.click(imgDrink);
  });
});
