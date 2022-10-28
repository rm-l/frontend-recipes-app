import React, { useContext, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import AppContext from '../context/AppContext';

function RecipeInProgress() {
  const { recipeInProgress, setRecipeInProgress, path, setPath, isMealInProgress,
    setIsMealInProgress, /* isDrinkInProgress, */
    setIsDrinkInProgress } = useContext(AppContext);
  // const [id, setId] = useState('');

  const { pathname } = useLocation();
  const { id } = useParams();

  useEffect(() => {
    // setPath(pathname);
    const isMeal = pathname.includes('meals');
    // const isDrink = pathname.includes('drinks');
    // setIsMealInProgress(isMeal);
    // setIsDrinkInProgress(isDrink);
    const fetchMealInProgress = async (isolatedId) => {
      const endPoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${isolatedId}`;
      const response = await fetch(endPoint);
      const { meals } = await response.json();
      setRecipeInProgress(meals);
    };
    const fetchDrinkInProgress = async (isolatedId) => {
      try {
        const endPoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${isolatedId}`;
        const response = await fetch(endPoint);
        const data = await response.json();
        console.log(data.drinks);
        setRecipeInProgress(data.drinks);
      } catch (error) {
        console.error(error);
      }
    };
    const fetchRecipeInProgress = async () => {
      if (isMeal) {
        // console.log('meal');
        // const SEVEN = 7;
        // const first = path.slice(SEVEN);
        // const index = first.indexOf('/');
        // const isolatedId = first.slice(0, index);
        // setId(isolatedId);
        fetchMealInProgress(id);
      } else {
        // const EIGHT = 8;
        // const first = path.slice(EIGHT);
        // const index = first.indexOf('/');
        // const isolatedId = first.slice(0, index);
        // setId(isolatedId);
        fetchDrinkInProgress(id);
      }
    };
    fetchRecipeInProgress();
  }, [id, isMealInProgress, path, pathname, setIsDrinkInProgress, setIsMealInProgress,
    setPath, setRecipeInProgress]);

  return (
    <div>
      {
        (isMealInProgress) ? (
          recipeInProgress.map((item) => (
            <div key={ item.idMeal }>
              <h2 data-testid="recipe-title">{item.strMeal}</h2>
              <button type="button" data-testid="share-btn">Share</button>
              <button type="button" data-testid="favorite-btn">Favorite</button>
              <button type="button" data-testid="finish-recipe-btn">Finish</button>
              <div>
                <img
                  style={ { width: '200px', height: '210px' } }
                  src={ item.strMealThumb }
                  alt={ item.strMeal }
                  data-testid="recipe-photo"
                />
              </div>
              <h4 data-testid="recipe-category">{item.strCategory}</h4>
              <p data-testid="instructions">{item.strInstructions}</p>
            </div>
          ))
        ) : (
          recipeInProgress.map((item) => (
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
            </div>
          ))
        )
      }
    </div>
  );
}

export default RecipeInProgress;
