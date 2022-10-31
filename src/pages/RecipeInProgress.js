import React, { useContext, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import AppContext from '../context/AppContext';
import '../styles/RecipeInProgress.css';

function RecipeInProgress() {
  const { recipeInProgress, setRecipeInProgress, path, setPath, isMealInProgress,
    setIsMealInProgress, isDrinkInProgress, ingredients, setIngredients, /* measures, */
    setIsDrinkInProgress, setMeasures } = useContext(AppContext);

  const { pathname } = useLocation();
  const { id } = useParams();

  const ingredientsFilter = () => {
    const ingre = [];
    const recipeEntries = Object.entries(recipeInProgress[0]);
    for (let i = 0; i < recipeEntries.length; i += 1) {
      if (recipeEntries[i][0].includes('strIngredient') && recipeEntries[i][1] !== ''
          && recipeEntries[i][1] !== null) {
        ingre.push(recipeEntries[i][1]);
      }
    }
    setIngredients(ingre);
  };

  const measuresFilter = () => {
    const measu = [];
    const recipeEntries = Object.entries(recipeInProgress[0]);
    for (let i = 0; i < recipeEntries.length; i += 1) {
      if (recipeEntries[i][0].includes('strMeasure') && recipeEntries[i][1] !== ''
      && recipeEntries[i][1] !== null) {
        measu.push(recipeEntries[i][1]);
      }
    }
    setMeasures(measu);
  };

  useEffect(() => {
    const getIngredientsAndMeasures = () => {
      if (recipeInProgress[0]) {
        ingredientsFilter();
        measuresFilter();
      }
    };
    getIngredientsAndMeasures();
  }, [recipeInProgress]);

  useEffect(() => {
    const isMeal = pathname.includes('meals');
    const isDrink = pathname.includes('drinks');
    setIsMealInProgress(isMeal);
    setIsDrinkInProgress(isDrink);

    const fetchMealInProgress = async (isolatedId) => {
      try {
        const endPoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${isolatedId}`;
        const response = await fetch(endPoint);
        const data = await response.json();
        setRecipeInProgress(data.meals);
      } catch (error) {
        console.error(error);
      }
    };
    const fetchDrinkInProgress = async (isolatedId) => {
      try {
        const endPoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${isolatedId}`;
        const response = await fetch(endPoint);
        const data = await response.json();
        setRecipeInProgress(data.drinks);
      } catch (error) {
        console.error(error);
      }
    };
    const fetchRecipeInProgress = async () => {
      if (isMeal) {
        fetchMealInProgress(id);
      } else {
        fetchDrinkInProgress(id);
      }
    };
    fetchRecipeInProgress();
  }, [id, isMealInProgress, path, pathname, setIsDrinkInProgress, setIsMealInProgress,
    setPath, setRecipeInProgress]);

  const handleChangeCheck = ({ target }) => {
    const { checked, name } = target;
    if (checked) {
      const labelActual = document.getElementById(name);
      labelActual.classList.add('checkedClass');
    }
  };

  return (
    <div>
      {
        (isMealInProgress) && (
          recipeInProgress?.map((item) => (
            <div key={ item.idMeal }>
              <p data-testid="recipe-title">{item.strMeal}</p>
              <button type="button" data-testid="share-btn">Share</button>
              <button type="button" data-testid="favorite-btn">Favorite</button>
              <button type="button" data-testid="finish-recipe-btn">Finish</button>
              <div>
                <img
                  style={ { width: '100px', height: '100px' } }
                  src={ item.strMealThumb }
                  alt={ item.strMeal }
                  data-testid="recipe-photo"
                />
              </div>
              <h4 data-testid="recipe-category">{item.strCategory}</h4>
              <p
                data-testid="instructions"
                style={ { 'font-size': '10px' } }
              >
                {item.strInstructions}
              </p>
              {
                ingredients?.map((ing, index) => (
                  <div key={ index }>
                    <label
                      htmlFor={ `${index}-ingredient-step` }
                      id={ `${index}-ingredient-step` }
                      data-testid={ `${index}-ingredient-step` }
                    >
                      {ing}
                      <input
                        type="checkbox"
                        name={ `${index}-ingredient-step` }
                        onChange={ handleChangeCheck }
                      />
                    </label>
                  </div>
                ))
              }
            </div>
          ))
        )
      }
      {
        (isDrinkInProgress) && (
          recipeInProgress?.map((item) => (
            <div key={ item.idDrink }>
              <h2 data-testid="recipe-title">{item.strDrink}</h2>
              <button type="button" data-testid="share-btn">Share</button>
              <button type="button" data-testid="favorite-btn">Favorite</button>
              <button type="button" data-testid="finish-recipe-btn">Finish</button>
              <div>
                <img
                  style={ { width: '200px', height: '210px' } }
                  src={ item.strDrinkThumb }
                  alt={ item.strDrink }
                  data-testid="recipe-photo"
                />
              </div>
              <h4 data-testid="recipe-category">{item.strCategory}</h4>
              <p data-testid="instructions">{item.strCategory}</p>
              {
                ingredients?.map((ingr, index) => (
                  <div key={ index }>
                    <label
                      htmlFor={ `${index}ingredient-step` }
                      id={ `${index}-ingredient-step` }
                      data-testid={ `${index}-ingredient-step` }
                    >
                      {ingr}
                      <input
                        type="checkbox"
                        name={ `${index}-ingredient-step` }
                        onChange={ handleChangeCheck }
                      />
                    </label>
                  </div>
                ))
              }
            </div>
          ))
        )
      }
    </div>
  );
}

export default RecipeInProgress;
