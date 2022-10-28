import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function RecipeDetails() {
  const [recipe, setRecipe] = useState();
  const { pathname } = useLocation();
  // const history = useHistory();

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
      }
      if (pathname === `/drinks/${id}`) {
        const response = await fetch((`${DRINK_ENDPOINT}${id}`));
        const result = await response.json();
        setRecipe(result.drinks);
      }
    };
    fetchApi();
  }, [id, pathname]);

  return (
    <div data-testid="recipe-details">
      {
        (pathname === `/meals/${id}`) && (
          <div>
            {console.log(recipe)}
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
                {/* <span data-testid={ `${i}-ingredient-name-and-measure` }>
                  {
                    `
                    ${meal.strIngredient1} -
                    ${meal.strMeasure1}`
                  }
                  <br />
                </span> */}
                <p data-testid="instructions">{meal.strInstructions}</p>

              </div>))}
          </div>
        )
      }
      {
        (pathname === `/drinks/${id}`)
           && (
             <div>
               {console.log(recipe.strDrink)}

               {/* <h1>{recipe.strDrink}</h1> */}
               { /* <p data-testid={ `${indexD}-card-name` }>{drink.strDrink}</p>
               <img
                 src={ drink.strDrinkThumb }
                 alt={ drink.strDrink }
                 data-testid={ `${indexD}-card-img` }
               /> */}
             </div>
           )
      }
    </div>
  );
}

export default RecipeDetails;
