import React, { useContext, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import AppContext from '../context/AppContext';
import '../styles/RecipeInProgress.css';
import RecipeInProgressCard from '../components/RecipeInProgressCard';

function RecipeInProgress() {
  const { recipeInProgress, setRecipeInProgress, path, setPath, isMealInProgress,
    setIsMealInProgress, ingredients, setIngredients,
    setIsDrinkInProgress, setMeasures, ingredientsUsedList, setIngredientsUsedList,
    setIsIngredientUsedList, /* isIngredientUsedList, isDrinkInProgress, measures, */
  } = useContext(AppContext);

  const { pathname } = useLocation();
  const { id } = useParams();

  const ingredientsFilter = () => {
    const ingre = [];
    const recipeEntries = Object.entries(recipeInProgress[0]);
    for (let i = 0; i < recipeEntries.length; i += 1) {
      if (recipeEntries[i][0].includes('strIngredient') && recipeEntries[i][1] !== ''
          && recipeEntries[i][1] !== null) {
        ingre.push(recipeEntries[i][1]);
      }
    }
    setIngredients(ingre);
  };

  const measuresFilter = () => {
    const measu = [];
    const recipeEntries = Object.entries(recipeInProgress[0]);
    for (let i = 0; i < recipeEntries.length; i += 1) {
      if (recipeEntries[i][0].includes('strMeasure') && recipeEntries[i][1] !== ''
      && recipeEntries[i][1] !== null) {
        measu.push(recipeEntries[i][1]);
      }
    }
    setMeasures(measu);
  };

  useEffect(() => {
    const getIngredientsAndMeasures = () => {
      if (recipeInProgress[0]) {
        ingredientsFilter();
        measuresFilter();
      }
    };
    getIngredientsAndMeasures();
  }, [recipeInProgress]);

  useEffect(() => {
    const isMeal = pathname.includes('meals');
    const isDrink = pathname.includes('drinks');
    setIsMealInProgress(isMeal);
    setIsDrinkInProgress(isDrink);

    const fetchMealInProgress = async (isolatedId) => {
      try {
        const endPoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${isolatedId}`;
        const response = await fetch(endPoint);
        const data = await response.json();
        setRecipeInProgress(data.meals);
      } catch (error) {
        console.error(error);
      }
    };
    const fetchDrinkInProgress = async (isolatedId) => {
      try {
        const endPoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${isolatedId}`;
        const response = await fetch(endPoint);
        const data = await response.json();
        setRecipeInProgress(data.drinks);
      } catch (error) {
        console.error(error);
      }
    };
    const fetchRecipeInProgress = async () => {
      if (isMeal) {
        fetchMealInProgress(id);
      } else {
        fetchDrinkInProgress(id);
      }
    };
    fetchRecipeInProgress();
  }, [id, isMealInProgress, path, pathname, setIsDrinkInProgress, setIsMealInProgress,
    setPath, setRecipeInProgress]);

  const handleChangeCheck = ({ target }) => {
    const { checked, name, value } = target;
    if (checked) {
      const labelActual = document.getElementById(name);
      labelActual.classList.add('checkedClass');
      if (isMealInProgress) {
        if (ingredientsUsedList.length > 0) {
          const previous = ingredientsUsedList.meals[id];
          const newIngredientsUsedList = JSON.parse(JSON.stringify(ingredientsUsedList));
          const modifiedIdIngredientsList = [...previous, value];
          newIngredientsUsedList.meals[id] = modifiedIdIngredientsList;
          localStorage.setItem('inProgressRecipes', JSON
            .stringify(newIngredientsUsedList));
        } else {
          const store = {
            meals: {
              [id]: [value],
            },
          };
          localStorage.setItem('inProgressRecipes', JSON.stringify(store));
        }
      } else if (ingredientsUsedList.length > 0) {
        const previous = ingredientsUsedList.drinks[id];
        const newIngredientsUsedList = JSON.parse(JSON.stringify(ingredientsUsedList));
        const modifiedIdIngredientsList = [...previous, value];
        newIngredientsUsedList.drinks[id] = modifiedIdIngredientsList;
        localStorage.setItem('inProgressRecipes', JSON
          .stringify(newIngredientsUsedList));
      } else {
        const store = {
          drinks: {
            [id]: [value],
          },
        };
        localStorage.setItem('inProgressRecipes', JSON.stringify(store));
      }
    }
  };

  useEffect(() => {
    const ingreList = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const checkedList = [];
    if (isMealInProgress && ingreList?.meals[id]) {
      setIngredientsUsedList(ingreList.meals[id]);
    } else if (!isMealInProgress && ingreList?.drinks) {
      setIngredientsUsedList(ingreList.drinks[id]);
    }
    if (ingredients) {
      ingredients.forEach((ingred) => {
        if (ingredientsUsedList.find((item) => ingred === item)) {
          checkedList.push(true);
        } else {
          checkedList.push(false);
        }
      });
    }
    setIsIngredientUsedList(checkedList);
  }, [ingredients]);

  return (
    <div>
      <RecipeInProgressCard handleChangeCheck={ handleChangeCheck } />
    </div>
  );
}

export default RecipeInProgress;
