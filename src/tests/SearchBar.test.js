import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import { mockMeals, mockDrinks, mockBeaverTails, mockGinTonic } from './helpers/mockData';

const searchTopBtn = 'search-top-btn';
const ingre = 'ingredient-search-radio';
const rName = 'name-search-radio';
const letter = 'first-letter-search-radio';
const inputS = 'search-input';
const btnSear = 'exec-search-btn';

describe('SercheBar tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test('Composição meals SearcBar', async () => {
    global.fetch = jest.spyOn(global, 'fetch');
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });
    renderWithRouter(<App />, '/meals');

    const searchBtn = screen.getByTestId(searchTopBtn);

    userEvent.click(searchBtn);

    const radioIngre = screen.getByTestId(ingre);
    const radioName = screen.getByTestId(rName);
    const radioLetter = screen.getByTestId(letter);
    const inputSearch = screen.getByTestId(inputS);
    const btnSearch = screen.getByTestId(btnSear);

    expect(radioIngre).toBeInTheDocument();
    expect(radioName).toBeInTheDocument();
    expect(radioLetter).toBeInTheDocument();
    expect(inputSearch).toBeInTheDocument();
    expect(btnSearch).toBeInTheDocument();
  });
  test('Meals by ingredient', async () => {
    renderWithRouter(<App />, '/meals');

    const searchBtn = screen.getByTestId(searchTopBtn);

    userEvent.click(searchBtn);

    const radioIngre = screen.getByTestId(ingre);
    const inputSearch = screen.getByTestId(inputS);
    const btnSearch = screen.getByTestId(btnSear);

    userEvent.click(radioIngre);
    userEvent.type(inputSearch, 'lemon');
    userEvent.click(btnSearch);
  });
  test('Meals by name', () => {
    renderWithRouter(<App />, '/meals');

    const searchBtn = screen.getByTestId(searchTopBtn);

    userEvent.click(searchBtn);

    const radioName = screen.getByTestId(rName);
    const inputSearch = screen.getByTestId(inputS);
    const btnSearch = screen.getByTestId(btnSear);

    userEvent.click(radioName);
    userEvent.type(inputSearch, 'beef');
    userEvent.click(btnSearch);
  });
  test('Meals by first letter', () => {
    renderWithRouter(<App />, '/meals');

    const searchBtn = screen.getByTestId(searchTopBtn);

    userEvent.click(searchBtn);

    const radioLetter = screen.getByTestId(letter);
    const inputSearch = screen.getByTestId(inputS);
    const btnSearch = screen.getByTestId(btnSear);

    userEvent.click(radioLetter);
    userEvent.type(inputSearch, 'n');
    userEvent.click(btnSearch);
  });
  test('Meals by first letter error', () => {
    renderWithRouter(<App />, '/meals');

    const searchBtn = screen.getByTestId(searchTopBtn);

    userEvent.click(searchBtn);

    const radioLetter = screen.getByTestId(letter);
    const inputSearch = screen.getByTestId(inputS);
    const btnSearch = screen.getByTestId(btnSear);

    userEvent.click(radioLetter);
    userEvent.type(inputSearch, 'no');
    userEvent.click(btnSearch);
  });
  test('Busca de meal com multiplas opções', async () => {
    global.fetch = jest.spyOn(global, 'fetch');
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    const { history } = renderWithRouter(<App />, '/meals');
  });

  test('Composição drinks SearcBar', async () => {
    renderWithRouter(<App />, '/drinks');

    const searchBtn = screen.getByTestId(searchTopBtn);

    userEvent.click(searchBtn);

    const radioIngre = screen.getByTestId(ingre);
    const radioName = screen.getByTestId(rName);
    const radioLetter = screen.getByTestId(letter);
    const inputSearch = screen.getByTestId(inputS);
    const btnSearch = screen.getByTestId(btnSear);

    expect(radioIngre).toBeInTheDocument();
    expect(radioName).toBeInTheDocument();
    expect(radioLetter).toBeInTheDocument();
    expect(inputSearch).toBeInTheDocument();
    expect(btnSearch).toBeInTheDocument();
  });
  test('Drinks by ingredient', async () => {
    renderWithRouter(<App />, '/drinks');

    const searchBtn = screen.getByTestId(searchTopBtn);

    userEvent.click(searchBtn);

    const radioIngre = screen.getByTestId(ingre);
    const inputSearch = screen.getByTestId(inputS);
    const btnSearch = screen.getByTestId(btnSear);

    userEvent.click(radioIngre);
    userEvent.type(inputSearch, 'vodka');
    userEvent.click(btnSearch);
  });
  test('Drinks by name', () => {
    renderWithRouter(<App />, '/drinks');

    const searchBtn = screen.getByTestId(searchTopBtn);

    userEvent.click(searchBtn);

    const radioName = screen.getByTestId(rName);
    const inputSearch = screen.getByTestId(inputS);
    const btnSearch = screen.getByTestId(btnSear);

    userEvent.click(radioName);
    userEvent.type(inputSearch, 'mojito');
    userEvent.click(btnSearch);
  });
  test('Drinks by first letter', () => {
    renderWithRouter(<App />, '/drinks');

    const searchBtn = screen.getByTestId(searchTopBtn);

    userEvent.click(searchBtn);

    const radioLetter = screen.getByTestId(letter);
    const inputSearch = screen.getByTestId(inputS);
    const btnSearch = screen.getByTestId(btnSear);

    userEvent.click(radioLetter);
    userEvent.type(inputSearch, 'n');
    userEvent.click(btnSearch);
  });
  test('Drinks by first letter error', () => {
    renderWithRouter(<App />, '/drinks');

    const searchBtn = screen.getByTestId(searchTopBtn);

    userEvent.click(searchBtn);

    const radioLetter = screen.getByTestId(letter);
    const inputSearch = screen.getByTestId(inputS);
    const btnSearch = screen.getByTestId(btnSear);

    userEvent.click(radioLetter);
    userEvent.type(inputSearch, 'no');
    userEvent.click(btnSearch);
  });
});
