import React, { useEffect, useState, useContext } from 'react';
import { useLocation, useParams, Link } from 'react-router-dom';
import ReactPlayer from 'react-player';
import copy from 'clipboard-copy';
import CarouselCard from '../components/CarouselCard';
import AppContext from '../context/AppContext';
import shareIcon from '../images/shareIcon.svg';

function RecipeDetails() {
  const [recipe, setRecipe] = useState();
  const [coisas, setCoisas] = useState();
  const [isMeal, setIsMeal] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isInProgress, setIsInProgess] = useState(false);
  const { setRecomendation } = useContext(AppContext);
  const { pathname } = useLocation();
  const { id } = useParams();

  const MEALS_ENDPOINT = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
  const DRINK_ENDPOINT = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

  useEffect(() => {
    const fetchApi = async () => {
      const SIX = 6;
      if (pathname === `/meals/${id}`) {
        const response = await fetch((`${MEALS_ENDPOINT}${id}`));
        const result = await response.json();
        setRecipe(result.meals);
        const a = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
        const b = await a.json();
        const c = b.drinks.filter((reco, index) => index < SIX);
        setRecomendation(c);
      }
      if (pathname === `/drinks/${id}`) {
        const response = await fetch((`${DRINK_ENDPOINT}${id}`));
        const result = await response.json();
        setRecipe(result.drinks);
        const c = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        const d = await c.json();
        const e = d.meals.filter((reco, index) => index < SIX);
        setRecomendation(e);
      }
    };
    fetchApi();
  }, [id, pathname]);

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

  useEffect(() => {
    setIsMeal(pathname.includes('/meals'));
    const recipesIn = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if ((isMeal && recipesIn !== null && recipesIn?.meals?.[id])
    || (!isMeal && recipesIn !== null && recipesIn?.drinks?.[id])) {
      setIsInProgess(true);
    }
  }, [id, isMeal, pathname]);

  return (
    <div>
      <CarouselCard />
      <div data-testid="recipe-details">
        {
          (pathname === `/meals/${id}`) && (
            <div>
              {recipe?.map((meal) => (
                <div key={ meal.strMeal }>
                  <h1 data-testid="recipe-title">{meal.strMeal}</h1>
                  <span data-testid="recipe-category">
                    {meal.strCategory}
                  </span>
                  <img
                    style={ { width: '100px', height: '100px' } }
                    src={ meal.strMealThumb }
                    alt={ meal.strMeal }
                    data-testid="recipe-photo"
                  />
                  <button type="button" data-testid="favorite-btn">
                    Favorite
                  </button>
                  <button
                    onClick={ () => {
                      setIsCopied(true);
                      copy(`http://localhost:3000${pathname}`);
                    } }
                    type="button"
                    data-testid="share-btn"
                  >
                    {isCopied ? 'Link copied!' : shareIcon}
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
                  {isInProgress ? 'Continue Recipe' : 'Start Recipe' }
                </button>
              </Link>
            </div>
          )
        }
        {
          (pathname === `/drinks/${id}`)
             && (
               <div>
                 {recipe?.map((drink) => (
                   <div key={ drink.strDrink }>
                     <h1 data-testid="recipe-title">{drink.strDrink}</h1>
                     <span data-testid="recipe-category">
                       {drink.strCategory}
                       {drink.strAlcoholic}
                     </span>
                     <img
                       style={ { width: '100px', height: '100px' } }
                       src={ drink.strDrinkThumb }
                       alt={ drink.strDrink }
                       data-testid="recipe-photo"
                     />
                     <button type="button" data-testid="favorite-btn">
                       Favorite
                     </button>
                     <button
                       onClick={ () => {
                         setIsCopied(true);
                         copy(`http://localhost:3000${pathname}`);
                       } }
                       type="button"
                       data-testid="share-btn"
                     >
                       {isCopied ? 'Link copied!' : shareIcon}
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
                     <p data-testid="instructions">
                       {drink.strInstructions}
                     </p>
                     <div data-testid="video">
                       <ReactPlayer url={ drink.strYoutube } />
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
                     {isInProgress ? 'Continue Recipe' : 'Start Recipe' }
                   </button>
                 </Link>
               </div>
             )
        }
      </div>
    </div>
  );
}

export default RecipeDetails;
