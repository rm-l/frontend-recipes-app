import React, { useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import AppContext from '../context/AppContext';

function SearchBar() {
  const { radioSearch, setRadioSearch, inputSearch, drinksList, setDrinksList,
    setInputSearch, mealsList, setMealsList, isMultipleMeals, setIsMultipleMeals,
    isMultipleDrinks, setIsMultipleDrinks } = useContext(AppContext);

  const { pathname } = useLocation();
  const history = useHistory();

  const handleRadio = ({ target }) => {
    const { value } = target;
    setRadioSearch(value);
  };

  const handleChangeInput = ({ target }) => {
    const { value } = target;
    setInputSearch(value);
  };

  const fetchApi = async (endPoint) => {
    const TWELVE = 12;
    if (pathname === '/meals') {
      const response = await fetch(endPoint);
      const { meals } = await response.json();
      if (meals.length === 1) {
        history.push(`/meals/${meals[0].idMeal}`);
        setMealsList(meals);
      } else if (meals.length > 1) {
        const filteredMeals = meals.filter((item, index) => index < TWELVE);
        setMealsList(filteredMeals);
        setIsMultipleMeals(true);
      } else {
        global.alert('Sorry, we haven\'t found any recipes for these filters.');
      }
    } else if (pathname === '/drinks') {
      const response = await fetch(endPoint);
      const { drinks } = await response.json();
      if (drinks.length === 1) {
        history.push(`/drinks/${drinks[0].idDrink}`);
        setDrinksList(drinks);
      } else if (drinks.length > 1) {
        const filteredDrinks = drinks.filter((item, index) => index < TWELVE);
        setDrinksList(filteredDrinks);
        setIsMultipleDrinks(true);
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
    } else if (pathname === '/drinks') {
      endPoint = drinksEndpoint();
    }

    if (endPoint) {
      fetchApi(endPoint);
    }
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
      <div>
        {
          (isMultipleMeals) && (
            mealsList.map((meal, index) => (
              <div key={ meal.strMeal } data-testid={ `${index}-recipe-card` }>
                <p data-testid={ `${index}-card-name` }>{meal.strMeal}</p>
                <img
                  src={ meal.strMealThumb }
                  alt={ meal.strMeal }
                  data-testid={ `${index}-card-img` }
                />
              </div>
            ))
          )
        }
        {
          (isMultipleDrinks) && (
            drinksList.map((drink, index) => (
              <div key={ drink.strDrink } data-testid={ `${index}-recipe-card` }>
                <p data-testid={ `${index}-card-name` }>{drink.strDrink}</p>
                <img
                  src={ drink.strDrinkThumb }
                  alt={ drink.strDrink }
                  data-testid={ `${index}-card-img` }
                />
              </div>
            ))
          )
        }
      </div>
    </div>
  );
}

export default SearchBar;
