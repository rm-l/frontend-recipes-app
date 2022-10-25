import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

function SearchBar() {
  const { radioSearch, setRadioSearch, inputSearch,
    setInputSearch, /* mealsList, */ setMealsList } = useContext(AppContext);

  const handleRadio = ({ target }) => {
    const { value } = target;
    setRadioSearch(value);
  };

  const handleChangeInput = ({ target }) => {
    const { value } = target;
    setInputSearch(value);
  };

  const fetchMeals = async (endPoint) => {
    const { meals } = await fetch(endPoint).then((response) => response.json());
    setMealsList(meals);
  };

  const handleClickSearch = () => {
    let endPoint;
    if (radioSearch === 'ingredient') {
      endPoint = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${inputSearch}`;
    } else if (radioSearch === 'name') {
      endPoint = `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputSearch}`;
    } else if (radioSearch === 'first' && inputSearch.length === 1) {
      endPoint = `https://www.themealdb.com/api/json/v1/1/search.php?f=${inputSearch}`;
    } else if (radioSearch === 'first' && inputSearch.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    }
    if (endPoint) {
      fetchMeals(endPoint);
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
