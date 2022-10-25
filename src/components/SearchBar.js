import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import AppContext from '../context/AppContext';

function SearchBar() {
  const { radioSearch, setRadioSearch, inputSearch, /* drinksList, */ setDrinksList,
    setInputSearch, /* mealsList, */ setMealsList } = useContext(AppContext);

  const { pathname } = useLocation();

  const handleRadio = ({ target }) => {
    const { value } = target;
    setRadioSearch(value);
  };

  const handleChangeInput = ({ target }) => {
    const { value } = target;
    setInputSearch(value);
  };

  const fetchApi = async (endPoint) => {
    if (pathname === '/meals') {
      const { meals } = await fetch(endPoint).then((response) => response.json());
      setMealsList(meals);
    } else if (pathname === '/drinks') {
      const { drinks } = await fetch(endPoint).then((response) => response.json());
      setDrinksList(drinks);
    }
  };

  const mealsEndpoint = () => {
    if (radioSearch === 'ingredient') {
      return `https://www.themealdb.com/api/json/v1/1/filter.php?i=${inputSearch}`;
    }
    if (radioSearch === 'name') {
      return `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputSearch}`;
    }
    if (radioSearch === 'first' && inputSearch.length === 1) {
      return `https://www.themealdb.com/api/json/v1/1/search.php?f=${inputSearch}`;
    }
    if (radioSearch === 'first' && inputSearch.length > 1) {
      return global.alert('Your search must have only 1 (one) character');
    }
  };

  const drinksEndpoint = () => {
    if (radioSearch === 'ingredient') {
      return `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${inputSearch}`;
    }
    if (radioSearch === 'name') {
      return `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputSearch}`;
    }
    if (radioSearch === 'first' && inputSearch.length === 1) {
      return `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${inputSearch}`;
    }
    if (radioSearch === 'first' && inputSearch.length > 1) {
      return global.alert('Your search must have only 1 (one) character');
    }
  };

  const handleClickSearch = () => {
    let endPoint;
    if (pathname === '/meals') {
      endPoint = mealsEndpoint();
    } else if (pathname === '/drinks') {
      endPoint = drinksEndpoint();
    }

    if (endPoint) {
      fetchApi(endPoint);
    }
  };

  return (
    <div>
      <label htmlFor="ingredient-search-radio">
        Ingredient
        <input
          type="radio"
          name="search-radio"
          id="ingredient-search-radio"
          value="ingredient"
          data-testid="ingredient-search-radio"
          onChange={ handleRadio }
        />
      </label>
      <label htmlFor="name-search-radio">
        Name
        <input
          type="radio"
          name="search-radio"
          id="name-search-radio"
          value="name"
          data-testid="name-search-radio"
          onChange={ handleRadio }
        />
      </label>
      <label htmlFor="first-letter-search-radio">
        First letter
        <input
          type="radio"
          name="search-radio"
          id="first-letter-search-radio"
          value="first"
          data-testid="first-letter-search-radio"
          onChange={ handleRadio }
        />
      </label>
      <input
        type="text"
        name="search-input"
        id="search-input"
        data-testid="search-input"
        onChange={ handleChangeInput }
      />
      <button type="button" data-testid="exec-search-btn" onClick={ handleClickSearch }>
        Search
      </button>
    </div>
  );
}

export default SearchBar;
