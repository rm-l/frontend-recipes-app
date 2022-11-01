import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import AppContext from '../context/AppContext';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function RecipeInProgressCard({ handleChangeCheck }) {
  const { recipeInProgress, ingredients, isMealInProgress,
    /* setIsMealInProgress,  setIngredients, setRecipeInProgress, path, setPath,
    setIsDrinkInProgress, setMeasures, ingredientsUsedList, setIngredientsUsedList,
    setIsIngredientUsedList, measures, */ isIngredientUsedList, isDrinkInProgress,
    /* favorites, setFavorites, */
  } = useContext(AppContext);

  const [isFavorite, setIsFavorite] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    const fave = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (fave !== null && fave?.find((item) => item.id === id)) {
      setIsFavorite(true);
    }
  }, [id]);

  const handleClickShare = () => {
    setIsCopied(true);
    if (isMealInProgress) {
      const link = `http://localhost:3000/meals/${id}`;
      copy(link);
    } else {
      const link = `http://localhost:3000/drinks/${id}`;
      copy(link);
    }
  };

  const mealFavoriteStorage = () => {
    const fave = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const favoriteMeal = {
      id,
      type: 'meal',
      nationality: recipeInProgress[0].strArea || '',
      category: recipeInProgress[0].strCategory || '',
      alcoholicOrNot: '',
      name: recipeInProgress[0].strMeal,
      image: recipeInProgress[0].strMealThumb,
    };
    if (fave !== null) {
      if (fave?.find((item) => item.id === id)) {
        const newFave = fave.filter((item) => item.id !== id);
        localStorage.setItem('favoriteRecipes', JSON.stringify(newFave));
        setIsFavorite(false);
      } else {
        const newFave = [...fave, favoriteMeal];
        localStorage.setItem('favoriteRecipes', JSON.stringify(newFave));
        setIsFavorite(true);
      }
    } else {
      localStorage.setItem('favoriteRecipes', JSON.stringify([favoriteMeal]));
      setIsFavorite(true);
    }
  };

  const drinkFavoriteStorage = () => {
    const fave = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const favoriteDrink = {
      id,
      type: 'drink',
      nationality: recipeInProgress[0].strArea || '',
      category: recipeInProgress[0].strCategory || '',
      alcoholicOrNot: recipeInProgress[0].strAlcoholic,
      name: recipeInProgress[0].strDrink,
      image: recipeInProgress[0].strDrinkThumb,
    };
    if (fave !== null) {
      if (fave?.find((item) => item.id === id)) {
        const newFave = fave.filter((item) => item.id !== id);
        localStorage.setItem('favoriteRecipes', JSON.stringify(newFave));
        setIsFavorite(false);
      } else {
        const newFave = [...fave, favoriteDrink];
        localStorage.setItem('favoriteRecipes', JSON.stringify(newFave));
        setIsFavorite(true);
      }
    } else {
      localStorage.setItem('favoriteRecipes', JSON.stringify([favoriteDrink]));
      setIsFavorite(true);
    }
  };

  const handleClickFavorite = () => {
    if (isMealInProgress) {
      mealFavoriteStorage();
    } else {
      drinkFavoriteStorage();
    }
  };

  return (
    <div>
      {
        (isMealInProgress) && (
          recipeInProgress?.map((item) => (
            <div key={ item.idMeal }>
              <p data-testid="recipe-title">{item.strMeal}</p>
              <button
                type="button"
                data-testid="share-btn"
                onClick={ handleClickShare }
              >
                { isCopied ? 'Link copied!' : 'Share'}
              </button>
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
              <button type="button" data-testid="finish-recipe-btn">Finish</button>
              <div>
                <img
                  style={ { width: '100px', height: '100px' } }
                  src={ item.strMealThumb }
                  alt={ item.strMeal }
                  data-testid="recipe-photo"
                />
              </div>
              <h4 data-testid="recipe-category">{item.strCategory}</h4>
              <p
                data-testid="instructions"
                style={ { fontSize: '10px' } }
              >
                {item.strInstructions}
              </p>
              {
                ingredients?.map((ing, index) => (
                  <div key={ index }>
                    <label
                      className={ isIngredientUsedList[index]
                        ? 'checkedClass' : undefined }
                      htmlFor={ `${index}-ingredient-step` }
                      id={ `${index}-ingredient-step` }
                      data-testid={ `${index}-ingredient-step` }
                    >
                      {ing}
                      <input
                        type="checkbox"
                        name={ `${index}-ingredient-step` }
                        checked={ isIngredientUsedList[index]
                          ? 'checked' : null }
                        onChange={ handleChangeCheck }
                        value={ ing }
                      />
                    </label>
                  </div>
                ))
              }
            </div>
          ))
        )
      }
      {
        (isDrinkInProgress) && (
          recipeInProgress?.map((item) => (
            <div key={ item.idDrink }>
              <h2 data-testid="recipe-title">{item.strDrink}</h2>
              <button
                type="button"
                data-testid="share-btn"
                onClick={ handleClickShare }
              >
                { isCopied ? 'Link copied!' : 'Share'}
              </button>
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
              {
                ingredients?.map((ingr, index) => (
                  <div key={ index }>
                    <label
                      className={ isIngredientUsedList[index]
                        ? 'checkedClass' : undefined }
                      htmlFor={ `${index}-ingredient-step` }
                      id={ `${index}-ingredient-step` }
                      data-testid={ `${index}-ingredient-step` }
                    >
                      {ingr}
                      <input
                        type="checkbox"
                        name={ `${index}-ingredient-step` }
                        checked={ isIngredientUsedList[index]
                          ? 'checked' : null }
                        onChange={ handleChangeCheck }
                        value={ ingr }
                      />
                    </label>
                  </div>
                ))
              }
            </div>
          ))
        )
      }
    </div>
  );
}

RecipeInProgressCard.propTypes = {
  handleChangeCheck: PropTypes.func.isRequired,
};

export default RecipeInProgressCard;
