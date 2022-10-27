import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import AppContext from '../context/AppContext';

function Recipes({ meal, indexM, indexD, drink }) {
  const { path } = useContext(AppContext);

  return (
    <div>
      {
        (path === '/meals') ? (
          <div>
            <p data-testid={ `${indexM}-card-name` }>{meal.strMeal}</p>
            <img
              src={ meal.strMealThumb }
              alt={ meal.strMeal }
              data-testid={ `${indexM}-card-img` }
            />
          </div>
        )
          : (
            <div>
              <p data-testid={ `${indexD}-card-name` }>{drink.strDrink}</p>
              <img
                src={ drink.strDrinkThumb }
                alt={ drink.strDrink }
                data-testid={ `${indexD}-card-img` }
              />
            </div>
          )
      }
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
