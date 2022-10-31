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

  const fetchApi = async () => {
    if (pathname.includes('meals')) {
      const response = await fetch((`${MEALS_ENDPOINT}${id}`));
      const result = await response.json();
      setRecipe(result.meals[0]);
    }
    (pathname.includes('drinks')); {
      const response = await fetch((`${DRINK_ENDPOINT}${id}`));
      const result = await response.json();
      setRecipe(result.drinks[0]);
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

  return (
    <>
      <div data-testid="recipe-details" />
      <span>
        test
        {console.log(recipe)}
      </span>
    </>

  );
}

export default RecipeDetails;
