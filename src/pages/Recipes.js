import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppContext from '../context/AppContext';
import RecipeCard from '../components/RecipeCard';

function Recipes() {
  const { isMultipleMeals, isMultipleDrinks, mealsList, drinksList, path,
    setMealCategories, setDrinkCategories, mealCategories, drinkCategories,
    setIsMultipleMeals, setIsMultipleDrinks, setMealsList, setDrinksList,
    isFiltered, setIsFiltered,
  } = useContext(AppContext);

  useEffect(() => {
    const fetchCategories = async () => {
      const FIVE = 5;
      if (path === '/meals') {
        const endPoint = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
        const response = await fetch(endPoint);
        const { meals } = await response.json();
        const filteredMealCategories = meals.filter((item, index) => index < FIVE);
        setMealCategories(filteredMealCategories);
      } else if (path === '/drinks') {
        const endPoint = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
        const response = await fetch(endPoint);
        const { drinks } = await response.json();
        const filteredDrinkCategories = drinks.filter((item, index) => index < FIVE);
        setDrinkCategories(filteredDrinkCategories);
      }
    };
    fetchCategories();
  }, [path, setDrinkCategories, setMealCategories]);

  const handleClickAllCat = async () => {
    const TWELVE = 12;
    if (path === '/meals') {
      const endPoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      const response = await fetch(endPoint);
      const { meals } = await response.json();
      const filteredMeals = meals.filter((item, index) => index < TWELVE);
      setMealsList(filteredMeals);
      setIsMultipleMeals(true);
    } else if (path === '/drinks') {
      const endPoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      const response = await fetch(endPoint);
      const { drinks } = await response.json();
      const filteredDrinks = drinks.filter((item, index) => index < TWELVE);
      setDrinksList(filteredDrinks);
      setIsMultipleDrinks(true);
    }
  };

  const handleClickMealCat = async (category) => {
    if (isFiltered) {
      handleClickAllCat();
      setIsFiltered(false);
    } else {
      const TWELVE = 12;
      const endPoint = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
      const response = await fetch(endPoint);
      const { meals } = await response.json();
      const filteredMeals = meals.filter((item, index) => index < TWELVE);
      setMealsList(filteredMeals);
      setIsFiltered(true);
    }
  };

  const handleClickDrinkCat = async (category) => {
    if (isFiltered) {
      handleClickAllCat();
      setIsFiltered(false);
    } else {
      const TWELVE = 12;
      const endPoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
      const response = await fetch(endPoint);
      const { drinks } = await response.json();
      const filteredDrinks = drinks.filter((item, index) => index < TWELVE);
      setDrinksList(filteredDrinks);
      setIsFiltered(true);
    }
  };

  return (
    <div>
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ handleClickAllCat }
      >
        All
      </button>
      <div>
        {
          (path === '/meals') && (
            mealCategories.map((mCat, index) => (
              <button
                type="button"
                key={ index }
                data-testid={ `${mCat.strCategory}-category-filter` }
                onClick={ () => handleClickMealCat(mCat.strCategory) }
              >
                {mCat.strCategory}
              </button>
            ))
          )
        }
        {
          (path === '/drinks') && (
            drinkCategories.map((dCat, index) => (
              <button
                type="button"
                key={ index }
                data-testid={ `${dCat.strCategory}-category-filter` }
                onClick={ () => handleClickDrinkCat(dCat.strCategory) }
              >
                {dCat.strCategory}
              </button>
            ))
          )
        }
      </div>
      <div>
        {
          (isMultipleMeals) && (
            mealsList.map((meal, indexM) => (
              <div key={ meal.strMeal }>
                <RecipeCard
                  meal={ meal }
                  indexM={ indexM }
                />
              </div>
            )))
        }
        {
          (isMultipleDrinks) && (
            drinksList.map((drink, indexD) => (
              <div key={ drink.strDrink }>
                <RecipeCard
                  drink={ drink }
                  indexD={ indexD }
                />
              </div>
            )))
        }
      </div>
    </div>
  );
}

Recipes.propTypes = {
  meal: PropTypes.shape({
    srtMeal: PropTypes.string,
    strMealThumb: PropTypes.string,
  }),
  drink: PropTypes.shape({
    srtDrink: PropTypes.string,
    strDrinkThumb: PropTypes.string,
  }),
  indexM: PropTypes.string,
  indexD: PropTypes.string,
}.isRequired;

export default Recipes;
