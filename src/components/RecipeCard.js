import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AppContext from '../context/AppContext';

function RecipeCard({ meal, indexM, indexD, drink }) {
  const { path } = useContext(AppContext);

  return (
    <div>
      {
        (path === '/meals') && (
          <Link to={ `/meals/${meal.idMeal}` }>
            <div data-testid={ `${indexM}-recipe-card` }>
              <p data-testid={ `${indexM}-card-name` }>{meal.strMeal}</p>
              <img
                src={ meal.strMealThumb }
                alt={ meal.strMeal }
                data-testid={ `${indexM}-card-img` }
                style={ { height: '200px', width: '200px' } }
              />
            </div>
          </Link>
        )
      }
      {
        (path === '/drinks')
           && (
             <Link to={ `/drinks/${drink.idDrink}` }>
               <div data-testid={ `${indexD}-recipe-card` }>
                 <p data-testid={ `${indexD}-card-name` }>{drink.strDrink}</p>
                 <img
                   src={ drink.strDrinkThumb }
                   alt={ drink.strDrink }
                   data-testid={ `${indexD}-card-img` }
                   style={ { height: '200px', width: '200px' } }
                 />
               </div>
             </Link>
           )
      }
    </div>
  );
}

RecipeCard.propTypes = {
  meal: PropTypes.shape({
    idMeal: PropTypes.string,
    srtMeal: PropTypes.string,
    strMealThumb: PropTypes.string,
  }),
  drink: PropTypes.shape({
    idDrink: PropTypes.string,
    srtDrink: PropTypes.string,
    strDrinkThumb: PropTypes.string,
  }),
  indexM: PropTypes.string,
  indexD: PropTypes.string,
}.isRequired;

export default RecipeCard;
