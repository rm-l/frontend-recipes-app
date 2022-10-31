import React from 'react';
import { screen/* , waitFor */ } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import { mockMeals, mockDrinks, mockBeaverTails, mockGinTonic, mockMealsNull, mockDrinksNull } from './helpers/mockData';

const searchTopBtn = 'search-top-btn';
const ingre = 'ingredient-search-radio';
const rName = 'name-search-radio';
const letter = 'first-letter-search-radio';
const inputS = 'search-input';
const btnSear = 'exec-search-btn';
const emailIn = 'email-input';
const passInp = 'password-input';
const btnLog = 'login-submit-btn';
const testEmail = 'test@test.com';

describe('Testes SearchBar', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test('SearchBar para meals por ingrediente multiplas respostas', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockMeals),
    });
    // let history;

    await act(async () => {
      renderWithRouter(<App />);
      // history = result.history;
    });

    const inputEmail = screen.getByTestId(emailIn);
    const inputPass = screen.getByTestId(passInp);
    const btnEnviar = screen.getByTestId(btnLog);

    userEvent.type(inputEmail, testEmail);
    userEvent.type(inputPass, '1234567');
    userEvent.click(btnEnviar);

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

    await act(async () => {
      userEvent.click(radioIngre);
      userEvent.type(inputSearch, 'chicken');
      userEvent.click(btnSearch);
    });
  });
  test('SearchBar para meals por nome uma resposta', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockBeaverTails),
    });

    await act(async () => {
      renderWithRouter(<App />);
    });

    const inputEmail = screen.getByTestId(emailIn);
    const inputPass = screen.getByTestId(passInp);
    const btnEnviar = screen.getByTestId(btnLog);

    userEvent.type(inputEmail, testEmail);
    userEvent.type(inputPass, '1234567');
    userEvent.click(btnEnviar);

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

    await act(async () => {
      userEvent.click(radioName);
      userEvent.type(inputSearch, 'beavertails');
      userEvent.click(btnSearch);
    });
  });
  test('SearchBar para meals por letra multiplas respostas', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockMeals),
    });

    await act(async () => {
      renderWithRouter(<App />);
    });

    const inputEmail = screen.getByTestId(emailIn);
    const inputPass = screen.getByTestId(passInp);
    const btnEnviar = screen.getByTestId(btnLog);

    userEvent.type(inputEmail, testEmail);
    userEvent.type(inputPass, '1234567');
    userEvent.click(btnEnviar);

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

    await act(async () => {
      userEvent.click(radioLetter);
      userEvent.type(inputSearch, 'n');
      userEvent.click(btnSearch);
    });
  });
  test('SearchBar para meals por ingrediente com erro', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockMealsNull),
    });
    window.alert = jest.fn();

    await act(async () => {
      renderWithRouter(<App />);
    });

    const inputEmail = screen.getByTestId(emailIn);
    const inputPass = screen.getByTestId(passInp);
    const btnEnviar = screen.getByTestId(btnLog);

    userEvent.type(inputEmail, testEmail);
    userEvent.type(inputPass, '1234567');
    userEvent.click(btnEnviar);

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

    await act(async () => {
      userEvent.click(radioIngre);
      userEvent.type(inputSearch, 'abcde');
      userEvent.click(btnSearch);
    });

    expect(window.alert).toHaveBeenCalled();
  });
  test('SearchBar para meals por ingrediente com erro', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockMealsNull),
    });
    window.alert = jest.fn();

    await act(async () => {
      renderWithRouter(<App />);
    });

    const inputEmail = screen.getByTestId(emailIn);
    const inputPass = screen.getByTestId(passInp);
    const btnEnviar = screen.getByTestId(btnLog);

    userEvent.type(inputEmail, testEmail);
    userEvent.type(inputPass, '1234567');
    userEvent.click(btnEnviar);

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

    await act(async () => {
      userEvent.click(radioLetter);
      userEvent.type(inputSearch, 'no');
      userEvent.click(btnSearch);
    });
  });

  test('SearchBar para drinks por ingrediente com multiplas respostas', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockDrinks),
    });

    await act(async () => {
      renderWithRouter(<App />, '/drinks');
    });

    // const inputEmail = screen.getByTestId('email-input');
    // const inputPass = screen.getByTestId('password-input');
    // const btnEnviar = screen.getByTestId('login-submit-btn');

    // userEvent.type(inputEmail, 'test@test.com');
    // userEvent.type(inputPass, '1234567');
    // userEvent.click(btnEnviar);

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

    await act(async () => {
      userEvent.click(radioIngre);
      userEvent.type(inputSearch, 'gin');
      userEvent.click(btnSearch);
    });
  });
  test('SearchBar para drinks por nome uma resposta', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockGinTonic),
    });

    await act(async () => {
      renderWithRouter(<App />, '/drinks');
    });

    // const inputEmail = screen.getByTestId('email-input');
    // const inputPass = screen.getByTestId('password-input');
    // const btnEnviar = screen.getByTestId('login-submit-btn');

    // userEvent.type(inputEmail, 'test@test.com');
    // userEvent.type(inputPass, '1234567');
    // userEvent.click(btnEnviar);

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

    await act(async () => {
      userEvent.click(radioName);
      userEvent.type(inputSearch, 'gin tonic');
      userEvent.click(btnSearch);
    });
  });
  test('SearchBar para drinks por letra multiplas respostas', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockDrinks),
    });

    await act(async () => {
      renderWithRouter(<App />, '/drinks');
    });

    // const inputEmail = screen.getByTestId('email-input');
    // const inputPass = screen.getByTestId('password-input');
    // const btnEnviar = screen.getByTestId('login-submit-btn');

    // userEvent.type(inputEmail, 'test@test.com');
    // userEvent.type(inputPass, '1234567');
    // userEvent.click(btnEnviar);

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

    await act(async () => {
      userEvent.click(radioLetter);
      userEvent.type(inputSearch, 'm');
      userEvent.click(btnSearch);
    });
  });
  test('SearchBar para drinks por ingrediente com erro', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockDrinksNull),
    });
    global.alert = jest.fn();

    await act(async () => {
      renderWithRouter(<App />, '/drinks');
    });

    // const inputEmail = screen.getByTestId('email-input');
    // const inputPass = screen.getByTestId('password-input');
    // const btnEnviar = screen.getByTestId('login-submit-btn');

    // userEvent.type(inputEmail, 'test@test.com');
    // userEvent.type(inputPass, '1234567');
    // userEvent.click(btnEnviar);

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

    await act(async () => {
      userEvent.click(radioIngre);
      userEvent.type(inputSearch, 'abcdef');
      userEvent.click(btnSearch);
    });
  });
  test('SearchBar para drinks por letra com erro', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockDrinksNull),
    });
    global.alert = jest.fn();

    await act(async () => {
      renderWithRouter(<App />, '/drinks');
    });

    // const inputEmail = screen.getByTestId('email-input');
    // const inputPass = screen.getByTestId('password-input');
    // const btnEnviar = screen.getByTestId('login-submit-btn');

    // userEvent.type(inputEmail, 'test@test.com');
    // userEvent.type(inputPass, '1234567');
    // userEvent.click(btnEnviar);

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

    await act(async () => {
      userEvent.click(radioLetter);
      userEvent.type(inputSearch, 'mo');
      userEvent.click(btnSearch);
    });
  });
});
