import React, { useContext, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import AppContext from '../context/AppContext';

function SearchBar() {
  const { radioSearch, setRadioSearch, inputSearch, setDrinksList,
    setInputSearch, setMealsList, setIsMultipleMeals,
    setIsMultipleDrinks, setPath,
  } = useContext(AppContext);

  const { pathname } = useLocation();
  const history = useHistory();

  useEffect(() => {
    setPath(pathname);
  }, [pathname, setPath]);

  const handleRadio = ({ target }) => {
    const { value } = target;
    setRadioSearch(value);
  };

  const handleChangeInput = ({ target }) => {
    const { value } = target;
    setInputSearch(value);
  };

  const mealsCase = (meals) => {
    const TWELVE = 12;
    if (meals.length === 1) {
      setMealsList(meals);
      setIsMultipleMeals(false);
      history.push(`/meals/${meals[0].idMeal}`);
    } else {
      const filteredMeals = meals.filter((item, index) => index < TWELVE);
      setMealsList(filteredMeals);
      setIsMultipleMeals(true);
    }
  };

  const drinksCase = (drinks) => {
    const TWELVE = 12;
    if (drinks.length === 1) {
      setDrinksList(drinks);
      setIsMultipleDrinks(false);
      history.push(`/drinks/${drinks[0].idDrink}`);
    } else {
      const filteredDrinks = drinks.filter((item, index) => index < TWELVE);
      setDrinksList(filteredDrinks);
      setIsMultipleDrinks(true);
    }
  };

  const fetchApi = async (endPoint) => {
    if (pathname === '/meals') {
      const response = await fetch(endPoint);
      const { meals } = await response.json();
      if (meals) {
        mealsCase(meals);
      } else {
        global.alert('Sorry, we haven\'t found any recipes for these filters.');
      }
    } else {
      const response = await fetch(endPoint);
      const { drinks } = await response.json();
      if (drinks) {
        drinksCase(drinks);
      } else {
        global.alert('Sorry, we haven\'t found any recipes for these filters.');
      }
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
    } else {
      endPoint = drinksEndpoint();
    }

    fetchApi(endPoint);
  };

  return (
    <div>
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
    </div>
  );
}

export default SearchBar;
