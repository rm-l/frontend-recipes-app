import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

const page = 'page-title';
const profile = 'profile-top-btn';
const searchId = 'search-top-btn';
const searchInp = 'search-input';

describe('Header testes', () => {
  test('Composição /meals', () => {
    renderWithRouter(<App />, '/meals');

    const pageTitle = screen.getByTestId(page);
    const profileBtn = screen.getByTestId(profile);
    const searchBtn = screen.getByTestId(searchId);

    expect(pageTitle).toBeInTheDocument();
    expect(profileBtn).toBeInTheDocument();
    expect(searchBtn).toBeInTheDocument();

    userEvent.click(searchBtn);

    const searchInput = screen.getByTestId(searchInp);

    expect(searchInput).toBeInTheDocument();

    expect(screen.getByText(/meals/i)).toBeInTheDocument();
  });
  test('Composição /drinks', () => {
    renderWithRouter(<App />, '/drinks');

    const pageTitle = screen.getByTestId(page);
    const profileBtn = screen.getByTestId(profile);
    const searchBtn = screen.getByTestId(searchId);

    expect(pageTitle).toBeInTheDocument();
    expect(profileBtn).toBeInTheDocument();
    expect(searchBtn).toBeInTheDocument();

    userEvent.click(searchBtn);

    const searchInput = screen.getByTestId(searchInp);

    expect(searchInput).toBeInTheDocument();

    expect(screen.getByText(/drinks/i)).toBeInTheDocument();
  });
  test('Composição /profile', () => {
    renderWithRouter(<App />, '/profile');

    const pageTitle = screen.getByTestId(page);
    const profileBtn = screen.getByTestId(profile);

    expect(pageTitle).toBeInTheDocument();
    expect(profileBtn).toBeInTheDocument();

    expect(screen.getByText(/profile/i)).toBeInTheDocument();
  });
  test('Composição /done-recipes', () => {
    renderWithRouter(<App />, '/done-recipes');

    const pageTitle = screen.getByTestId(page);
    const profileBtn = screen.getByTestId(profile);

    expect(pageTitle).toBeInTheDocument();
    expect(profileBtn).toBeInTheDocument();

    expect(screen.getByText(/done recipes/i)).toBeInTheDocument();
  });
  test('Composição /favorite-recipes', () => {
    renderWithRouter(<App />, '/favorite-recipes');

    const pageTitle = screen.getByTestId(page);
    const profileBtn = screen.getByTestId(profile);

    expect(pageTitle).toBeInTheDocument();
    expect(profileBtn).toBeInTheDocument();

    expect(screen.getByText(/favorite recipes/i)).toBeInTheDocument();
  });
  test('Composição ""', () => {
    renderWithRouter(<App />, '/meals');

    const pageTitle = screen.getByTestId(page);
    const profileBtn = screen.getByTestId(profile);
    const searchBtn = screen.getByTestId(searchId);

    expect(pageTitle).toBeInTheDocument();
    expect(profileBtn).toBeInTheDocument();
    expect(searchBtn).toBeInTheDocument();

    userEvent.click(searchBtn);

    const searchInput = screen.getByTestId(searchInp);

    expect(searchInput).toBeInTheDocument();
  });
});
