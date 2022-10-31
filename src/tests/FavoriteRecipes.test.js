// @ts-nocheck
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import fetch from '../../cypress/mocks/fetch';
import App from '../App';
import { getLocalStorage, setLocalStorage } from '../services/LocalStorage';
import {
  DRINK_NAME,
  FAVORITE_KEY_LOCAL_STORAGE,
  FAVORITE_RECIPES_PATHNAME,
  MEAL_NAME,
} from './helpers/InformationTest';
import renderWithRouter from './helpers/renderWithRouter';
import {
  MOCK_FAVORITE_RECIPE_ALL,
  MOCK_FAVORITE_RECIPE_ALL_AFTER,
} from './helpers/MockUtils';

describe('Test the Favorite Recipes component.', () => {
  it('Tests if, when accessing the favorite page, the recipe list provides the recipe without category filters.', () => {
    jest.spyOn(global, 'fetch').mockImplementation(fetch);

    setLocalStorage(FAVORITE_KEY_LOCAL_STORAGE, MOCK_FAVORITE_RECIPE_ALL);

    renderWithRouter(<App />, FAVORITE_RECIPES_PATHNAME);

    const drinkName = screen.getByText(DRINK_NAME);
    const mealName = screen.getByText(MEAL_NAME);

    expect(drinkName).toBeInTheDocument();
    expect(mealName).toBeInTheDocument();
  });

  it('Tests if, when clicking the "drinks" button, only the drinks with category drink will appearo.', () => {
    jest.spyOn(global, 'fetch').mockImplementation(fetch);

    setLocalStorage(FAVORITE_KEY_LOCAL_STORAGE, MOCK_FAVORITE_RECIPE_ALL);

    renderWithRouter(<App />, FAVORITE_RECIPES_PATHNAME);

    const drinkButton = screen.getByRole('button', { name: 'Drinks' });
    expect(drinkButton).toBeInTheDocument();

    userEvent.click(drinkButton);

    const drinkName = screen.queryByText(DRINK_NAME);
    const mealName = screen.queryByText(MEAL_NAME);

    expect(drinkName).toBeInTheDocument();
    expect(mealName).not.toBeInTheDocument();
  });

  it('Tests if, when clicking the "food" button, only the recipes with category Meal will appear.', () => {
    jest.spyOn(global, 'fetch').mockImplementation(fetch);

    setLocalStorage(FAVORITE_KEY_LOCAL_STORAGE, MOCK_FAVORITE_RECIPE_ALL);

    renderWithRouter(<App />, FAVORITE_RECIPES_PATHNAME);

    const mealsButton = screen.getByRole('button', { name: 'Food' });
    expect(mealsButton).toBeInTheDocument();

    userEvent.click(mealsButton);

    const drinkName = screen.queryByText(DRINK_NAME);
    const mealName = screen.queryByText(MEAL_NAME);

    expect(drinkName).not.toBeInTheDocument();
    expect(mealName).toBeInTheDocument();

    const allButton = screen.getByRole('button', { name: 'All' });
    expect(allButton).toBeInTheDocument();

    userEvent.click(allButton);

    const drinkNameAfter = screen.queryByText(DRINK_NAME);
    const mealNameAfter = screen.queryByText(MEAL_NAME);

    expect(drinkNameAfter).toBeInTheDocument();
    expect(mealNameAfter).toBeInTheDocument();
  });

  it('Tests if, when clicking the sharing button, the link is copied.', () => {
    jest.spyOn(global, 'fetch').mockImplementation(fetch);
    navigator.clipboard = {
      writeText: jest.fn(),
    };

    renderWithRouter(<App />, FAVORITE_RECIPES_PATHNAME);

    const shareButton = screen.getByTestId('0-horizontal-share-btn');
    expect(shareButton).toBeInTheDocument();

    const shareMessageBefore = screen.queryByText(/Link copied!/i);

    expect(shareMessageBefore).not.toBeInTheDocument();

    userEvent.click(shareButton);

    const shareMessageAfter = screen.queryByText(/Link copied!/i);

    expect(shareMessageAfter).toBeInTheDocument();
  });

  it('Tests if, when clicking the favorite button, the recipe is removed from the favorite list. ', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(fetch);

    setLocalStorage(FAVORITE_KEY_LOCAL_STORAGE, MOCK_FAVORITE_RECIPE_ALL);

    renderWithRouter(<App />, FAVORITE_RECIPES_PATHNAME);
    const favoriteListBefore = getLocalStorage(FAVORITE_KEY_LOCAL_STORAGE);
    expect(favoriteListBefore).toEqual(MOCK_FAVORITE_RECIPE_ALL);

    const drinkNameBefore = screen.queryByTestId('0-horizontal-name');
    const mealNameBefore = screen.queryByTestId('1-horizontal-name');

    expect(drinkNameBefore).toBeInTheDocument();
    expect(mealNameBefore).toBeInTheDocument();

    const favoriteButton = screen.getByTestId('1-horizontal-favorite-btn');
    userEvent.click(favoriteButton);

    const favoriteListAfter = getLocalStorage(FAVORITE_KEY_LOCAL_STORAGE);

    expect(favoriteListAfter).toEqual(MOCK_FAVORITE_RECIPE_ALL_AFTER);

    const drinkNameAfter = screen.queryByText(DRINK_NAME);
    const mealNameAfter = screen.queryByText(MEAL_NAME);

    expect(drinkNameAfter).toBeInTheDocument();
    expect(mealNameAfter).not.toBeInTheDocument();
  });
});
