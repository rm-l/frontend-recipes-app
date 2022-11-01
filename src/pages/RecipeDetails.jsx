import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import ReactPlayer from 'react-player';

function RecipeDetails() {
  const [recipe, setRecipe] = useState();
  const [coisas, setCoisas] = useState();
  const [recomendation, setRecomendation] = useState();
  const { pathname } = useLocation();

  const MEALS_ENDPOINT = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
  const DRINK_ENDPOINT = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

  function pathnameId() {
    const id = pathname.replace(/[^0-9]/g, '');
    return parseInt(id, 10);
  }
  const id = pathnameId();

  useEffect(() => {
    const fetchApi = async () => {
      if (pathname === `/meals/${id}`) {
        const response = await fetch((`${MEALS_ENDPOINT}${id}`));
        const result = await response.json();
        setRecipe(result.meals);
        const a = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
        const b = await a.json();
        setRecomendation(b);
      }
      if (pathname === `/drinks/${id}`) {
        const response = await fetch((`${DRINK_ENDPOINT}${id}`));
        const result = await response.json();
        setRecipe(result.drinks);
        const c = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        const d = await c.json();
        setRecomendation(d);
      }
    };
    fetchApi();
  }, [id, pathname]);
  console.log(recomendation);
  useEffect(() => {
    const coisasFilter = async () => {
      const ingre = [];
      const measure = [];
      if (recipe) {
        const recipeEntries = Object.entries(recipe[0]);
        for (let i = 0; i < recipeEntries.length; i += 1) {
          if (recipeEntries[i][0].includes('strIngredient') && recipeEntries[i][1] !== ''
                && recipeEntries[i][1] !== null) {
            ingre.push(recipeEntries[i][1]);
          }
          if (recipeEntries[i][0].includes('strMeasure') && recipeEntries[i][1] !== ' '
          && recipeEntries[i][1] !== null) {
            measure.push(recipeEntries[i][1]);
          }
        }
      }
      const itens = ingre.map((item, index) => ({
        ingredientes: item,
        medidas: measure[index],
      }));
      setCoisas(itens);
    };

    coisasFilter();
  }, [recipe]);

  return (
    <div data-testid="recipe-details">
      {
        (pathname === `/meals/${id}`) && (
          <div>
            {recipe?.map((meal) => (
              <div key={ meal.strMeal }>
                <h1 data-testid="recipe-title">
                  {meal.strMeal}
                </h1>
                <span data-testid="recipe-category">
                  {meal.strCategory}
                </span>
                <img
                  src={ meal.strMealThumb }
                  alt={ meal.strMeal }
                  data-testid="recipe-photo"
                />
                <button
                  type="button"
                  data-testid="favorite-btn"
                >
                  Favorite
                </button>
                <button
                  type="button"
                  data-testid="share-btn"
                >
                  share
                </button>
                <ul>
                  {coisas?.map((iten, index) => (
                    <li
                      key={ index }
                      data-testid={ `${index}-ingredient-name-and-measure` }
                    >
                      {`${iten.ingredientes} - ${iten.medidas}`}
                    </li>
                  ))}
                </ul>
                <p
                  data-testid="instructions"
                >
                  {meal.strInstructions}
                </p>
                <div
                  data-testid="video"
                >
                  <ReactPlayer
                    url={ meal.strYoutube }
                  />
                </div>
              </div>))}
            <Link to={ `/meals/${id}/in-progress` }>
              <button
                type="button"
                data-testid="start-recipe-btn"
                style={ {
                  position: 'fixed',
                  bottom: 0,
                } }
              >
                Start Recipe
              </button>
            </Link>
          </div>
        )
      }
      {
        (pathname === `/drinks/${id}`)
           && (
             <div>
               {/* {console.log(recipe)} */}
               {recipe?.map((drink) => (
                 <div key={ drink.strDrink }>
                   <h1
                     data-testid="recipe-title"
                   >
                     {drink.strDrink}
                   </h1>
                   <span data-testid="recipe-category">
                     {drink.strCategory}
                     {drink.strAlcoholic}
                   </span>
                   <img
                     src={ drink.strDrinkThumb }
                     alt={ drink.strDrink }
                     data-testid="recipe-photo"
                   />
                   <button
                     type="button"
                     data-testid="favorite-btn"
                   >
                     Favorite
                   </button>
                   <button
                     type="button"
                     data-testid="share-btn"
                   >
                     share
                   </button>
                   <ul>
                     {coisas?.map((iten, index) => (
                       <li
                         key={ index }
                         data-testid={ `${index}-ingredient-name-and-measure` }
                       >
                         {`${iten.ingredientes} - ${iten.medidas}`}
                       </li>
                     ))}
                   </ul>
                   <p
                     data-testid="instructions"
                   >
                     {drink.strInstructions}
                   </p>
                   <div
                     data-testid="video"
                   >
                     <ReactPlayer
                       url={ drink.strYoutube }
                     />
                   </div>
                 </div>))}
               <Link to={ `/drinks/${id}/in-progress` }>
                 <button
                   type="button"
                   data-testid="start-recipe-btn"
                   style={ {
                     position: 'fixed',
                     bottom: 0,
                   } }
                 >
                   Start Recipe
                 </button>
               </Link>
             </div>
           )
      }
    </div>
  );
}

export default RecipeDetails;
