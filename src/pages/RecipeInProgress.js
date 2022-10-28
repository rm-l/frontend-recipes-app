import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import AppContext from '../context/AppContext';

function RecipeInProgress() {
  const { recipeInProgress, setRecipeInProgress, path, setPath, isMealInProgress,
    setIsMealInProgress } = useContext(AppContext);
  const [id, setId] = useState('');

  const { pathname } = useLocation();

  useEffect(() => {
    setPath(pathname);
    const isMeal = pathname.includes('meals');
    setIsMealInProgress(isMeal);
    const fetchRecipeInProgress = async () => {
      if (isMeal) {
        const SEVEN = 7;
        const first = path.slice(SEVEN);
        const index = first.indexOf('/');
        const isoledId = first.slice(0, index);
        setId(isoledId);
        const endPoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
        const response = await fetch(endPoint);
        const { meals } = await response.json();
        setRecipeInProgress(meals);
      } else {
        const EIGHT = 8;
        const first = path.slice(EIGHT);
        const index = first.indexOf('/');
        const isoledId = first.slice(0, index);
        setId(isoledId);
        console.log(id);
        const endPoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
        const response = await fetch(endPoint);
        const { drinks } = await response.json();
        setRecipeInProgress(drinks);
      }
    };
    fetchRecipeInProgress();
  }, [id, isMealInProgress, path, pathname, setIsMealInProgress, setPath,
    setRecipeInProgress]);

  return (
    <div>
      {
        (isMealInProgress) ? (
          recipeInProgress.map((item) => (
            <div key={ item.idMeal }>
              <h2 data-testid="recipe-title">{item.strMeal}</h2>
              <img
                src={ item.strMealThumb }
                alt={ item.strMeal }
                data-testid="recipe-photo"
              />
              <button type="button" date-testid="share-btn">Share</button>
              <button type="button" data-testid="favorite-btn">Favorite</button>
              <h4 data-testid="recipe-category">{item.strCategory}</h4>
              <p data-testid="instructions">{item.strInstructions}</p>
              <button type="button" data-testid="finish-recipe-btn">Finish</button>
            </div>
          ))
        ) : (
          recipeInProgress.map((item) => (
            <div key={ item.idDrink }>
              <h2 data-testid="recipe-title">{item.strDrink}</h2>
              <img
                src={ item.strDrinkThumb }
                alt={ item.strDrink }
                data-testid="recipe-photo"
              />
              <button type="button" date-testid="share-btn">Share</button>
              <button type="button" data-testid="favorite-btn">Favorite</button>
              <h4 data-testid="recipe-category">{item.strCategory}</h4>
              <p data-testid="instructions">{item.strCategory}</p>
              <button type="button" data-testid="finish-recipe-btn">Finish</button>
            </div>
          ))
        )
      }
    </div>
  );
}

export default RecipeInProgress;
