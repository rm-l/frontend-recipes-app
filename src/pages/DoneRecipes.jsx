import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';

export default function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState([]);

  useEffect(() => {
    if (Object.prototype.hasOwnProperty
      .call(localStorage, 'doneRecipes')) {
      const recipes = JSON.parse(
        localStorage.getItem('doneRecipes'),
      );
      setDoneRecipes(recipes);
    }
  }, []);

  return (
    <div>
      <Header />

      <button
        type="button"
        data-testid="filter-by-all-btn"
      >
        All
      </button>

      <button
        type="button"
        data-testid="filter-by-meal-btn"
      >
        Meals
      </button>

      <button
        type="button"
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>

      {doneRecipes.map((recipe, index) => (
        <>
          <img
            data-testid={ `${index}-horizontal-image` }
            src={ recipe.image }
            alt={ recipe.name }
          />

          { recipe.type === 'meal' ? (
            <div>
              <p
                data-testid={ `${index}-horizontal-top-text` }
              >
                {`${recipe.nationality} - ${recipe.category}`}
              </p>

              {
                recipe.tags.map((tag, i) => (
                  <p
                    key={ i }
                    data-testid={ `${index}-${tag}-horizontal-tag` }
                  >
                    {tag}
                  </p>))
              }
            </div>
          ) : (

            <p
              data-testid={ `${index}-horizontal-top-text` }
            >
              {`${recipe.alcoholicOrNot}`}
            </p>
          ) }

          <p
            data-testid={ `${index}-horizontal-name` }
          >
            {recipe.name}
          </p>

          <p
            data-testid={ `${index}-horizontal-done-date` }
          >
            {recipe.doneDate}
          </p>

          <button
            type="button"
            data-testid={ `${index}-horizontal-share-btn` }
            src={ shareIcon }
          >
            <img src={ shareIcon } alt="share" />
          </button>
        </>
      ))}
    </div>
  );
}
