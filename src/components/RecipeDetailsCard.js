import React, { /* useEffect, useState, */ useContext } from 'react';
import { useLocation, useParams, Link } from 'react-router-dom';
import copy from 'clipboard-copy';
import PropTypes from 'prop-types';
import icon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import AppContext from '../context/AppContext';

function RecipeDetailsCard({ handleClickFavorite, isFavorite }) {
  const { recipe, coisas, isCopied, setIsCopied, isInProgress, /* setIsMeal,
    setIsInProgess, setRecomendation, isMeal, setCoisas,
    setRecipe */ } = useContext(AppContext);
  const { pathname } = useLocation();
  const { id } = useParams();
  return (
    <div>
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
                  <button
                    type="button"
                    onClick={ handleClickFavorite }
                  >
                    <img
                      src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
                      alt=""
                      data-testid="favorite-btn"
                    />
                  </button>
                  <button
                    onClick={ () => {
                      setIsCopied(true);
                      copy(`http://localhost:3000${pathname}`);
                    } }
                    type="button"
                    data-testid="share-btn"
                  >
                    {
                      (isCopied) ? (
                        'Link copied!'
                      ) : (
                        <img
                          src={ icon }
                          alt=""
                          data-testid="favorite-btn"
                        />
                      )
                    }
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
                    <iframe
                      title="Youtube"
                      width="350"
                      height="220"
                      src={ `https://www.youtube.com/embed/${(meal.strYoutube.split('='))[1]}` }
                      frameBorder="0"
                      allow="accelerometerautoplay;
        clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
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
                     <button
                       type="button"
                       onClick={ handleClickFavorite }
                     >
                       <img
                         src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
                         alt=""
                         data-testid="favorite-btn"
                       />
                     </button>
                     <button
                       onClick={ () => {
                         setIsCopied(true);
                         copy(`http://localhost:3000${pathname}`);
                       } }
                       type="button"
                       data-testid="share-btn"
                     >
                       {
                         (isCopied) ? (
                           'Link copied!'
                         ) : (
                           <img
                             src={ icon }
                             alt=""
                             data-testid="favorite-btn"
                           />
                         )
                       }
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
                       <iframe
                         title="Youtube"
                         width="350"
                         height="220"
                         src={ `https://www.youtube.com/embed/${(drink.strYoutube.split('='))[1]}` }
                         frameBorder="0"
                         allow="accelerometerautoplay;
        clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                         allowFullScreen
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

RecipeDetailsCard.propTypes = {
  handleClickFavorite: PropTypes.func.isRequired,
  isFavorite: PropTypes.bool.isRequired,
};

export default RecipeDetailsCard;
