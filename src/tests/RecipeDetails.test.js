import React from 'react';
import { screen /* , waitFor */ } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import copy from 'clipboard-copy';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
// import { mockMealCategories, mockDrinkCategories } from './helpers/mockData';
import fetch from '../../cypress/mocks/fetch';

const share = 'share-btn';
const favorite = 'favorite-btn';
const start = 'start-recipe-btn';
const mealsEndPoint = '/meals/52771';
const drinksEndPoint = '/drinks/178319';

jest.mock('clipboard-copy');

describe('Testes RecipeDetailsPage', () => {
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

  test('Composição tela de rota /meals/52771', async () => {
    global.fetch = jest.fn(fetch);

    await act(async () => {
      renderWithRouter(<App />, mealsEndPoint);
    });

    const shareBtn = screen.getByTestId(share);
    const favoriteBtn = screen.getByTestId(favorite);
    const startBtn = screen.getByTestId(start);
    const title = screen.getByTestId('recipe-title');
    const photo = screen.getByTestId('recipe-photo');
    const category = screen.getByTestId('recipe-category');
    const instructions = screen.getByTestId('instructions');
    const details = screen.getByTestId('recipe-details');
    const ingreAndMeasure = screen.getByTestId('0-ingredient-name-and-measure');
    const video = screen.getByTestId('video');

    expect(shareBtn).toBeInTheDocument();
    expect(favoriteBtn).toBeInTheDocument();
    expect(startBtn).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(photo).toBeInTheDocument();
    expect(category).toBeInTheDocument();
    expect(instructions).toBeInTheDocument();
    expect(details).toBeInTheDocument();
    expect(ingreAndMeasure).toBeInTheDocument();
    expect(video).toBeInTheDocument();
  });
  test('Funções dos botões em rota /meals/52771', async () => {
    global.fetch = jest.fn(fetch);
    copy.mockImplementation(() => {});
    let history;
    await act(async () => {
      const result = renderWithRouter(<App />, mealsEndPoint);
      history = result.history;
    });

    const shareBtn = screen.getByTestId(share);
    const favoriteBtn = screen.getByTestId(favorite);
    const startBtn = screen.getByTestId(start);

    userEvent.click(favoriteBtn);
    userEvent.click(favoriteBtn);
    userEvent.click(favoriteBtn);
    userEvent.click(shareBtn);

    expect(jest.isMockFunction(window.location.reload)).toBe(true);
    window.location.reload();
    expect(window.location.reload).toHaveBeenCalled();

    userEvent.click(startBtn);

    const ingredient0 = await screen.findByTestId('0-ingredient-step-check');

    userEvent.click(ingredient0);

    act(() => history.push('/meals/52771'));
  });
  test('Composição tela de rota /drinks/178319', async () => {
    global.fetch = jest.fn(fetch);

    await act(async () => {
      renderWithRouter(<App />, drinksEndPoint);
    });

    const shareBtn = screen.getByTestId(share);
    const favoriteBtn = screen.getByTestId(favorite);
    const startBtn = screen.getByTestId(start);
    const title = screen.getByTestId('recipe-title');
    const photo = screen.getByTestId('recipe-photo');
    const category = screen.getByTestId('recipe-category');
    const instructions = screen.getByTestId('instructions');
    const details = screen.getByTestId('recipe-details');
    const ingreAndMeasure = screen.getByTestId('0-ingredient-name-and-measure');
    const video = screen.getByTestId('video');

    expect(shareBtn).toBeInTheDocument();
    expect(favoriteBtn).toBeInTheDocument();
    expect(startBtn).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(photo).toBeInTheDocument();
    expect(category).toBeInTheDocument();
    expect(instructions).toBeInTheDocument();
    expect(details).toBeInTheDocument();
    expect(ingreAndMeasure).toBeInTheDocument();
    expect(video).toBeInTheDocument();
  });
  test('Funções dos botões em rota /drinks/178319', async () => {
    global.fetch = jest.fn(fetch);
    copy.mockImplementation(() => {});

    let history;

    await act(async () => {
      const result = renderWithRouter(<App />, drinksEndPoint);
      history = result.history;
    });

    const shareBtn = screen.getByTestId(share);
    const favoriteBtn = screen.getByTestId(favorite);
    const startBtn = screen.getByTestId(start);

    userEvent.click(favoriteBtn);
    userEvent.click(favoriteBtn);
    userEvent.click(favoriteBtn);
    userEvent.click(shareBtn);

    expect(jest.isMockFunction(window.location.reload)).toBe(true);
    window.location.reload();
    expect(window.location.reload).toHaveBeenCalled();

    userEvent.click(startBtn);

    const ingredient0 = await screen.findByTestId('0-ingredient-step-check');

    userEvent.click(ingredient0);

    act(() => history.push('/drinks/178319'));
  });
});
