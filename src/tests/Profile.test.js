import React from 'react';
// import Profile from '../pages/Profile';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

describe('Testing the profile screen', () => {
  it('Test if when clicking the Denrecipes button is directing the Revenue Screen ready', async () => {
    const { history } = renderWithRouter(<App />, '/Profile');
    const buttonDoneRecipes = screen.getByTestId('profile-done-btn');
    expect(buttonDoneRecipes).toBeInTheDocument();
    userEvent.click(buttonDoneRecipes);

    const { pathname } = history.location;

    await waitFor(() => {
      expect(pathname).toBe('/done-recipes');
    }, { timeout: 3000 });
  });
  it('Test if when clicking the Favoriterecipes button is directing the favorite recipe screen', async () => {
    const { history } = renderWithRouter(<App />, '/Profile');
    const buttonFavoriteRecipes = screen.getByTestId('profile-favorite-btn');
    expect(buttonFavoriteRecipes).toBeInTheDocument();
    userEvent.click(buttonFavoriteRecipes);

    const { pathname } = history.location;

    await waitFor(() => {
      expect(pathname).toBe('/favorite-recipes');
    }, { timeout: 3000 });
  });
  it('Test if when clicking the Logret button is directing the login screen', async () => {
    const { history } = renderWithRouter(<App />, '/Profile');
    const buttonLogout = screen.getByTestId('profile-logout-btn');
    expect(buttonLogout).toBeInTheDocument();
    userEvent.click(buttonLogout);

    const { pathname } = history.location;

    await waitFor(() => {
      expect(pathname).toBe('/');
    }, { timeout: 3000 });
  });
});
