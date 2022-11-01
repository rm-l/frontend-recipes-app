import React, { useContext, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import AppContext from '../context/AppContext';
import '../styles/RecipeInProgress.css';
import RecipeInProgressCard from '../components/RecipeInProgressCard';

function RecipeInProgress() {
  const { recipeInProgress, setRecipeInProgress, path, setPath, isMealInProgress,
    setIsMealInProgress, ingredients, setIngredients,
    setIsDrinkInProgress, setMeasures, ingredientsUsedList, setIngredientsUsedList,
    setIsIngredientUsedList, isIngredientUsedList, setIsFinishDisabled,
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

  const checkCanFinish = () => {
    console.log('test');
    console.log(isIngredientUsedList);
    if (!isIngredientUsedList.some((item) => item === false)) {
      console.log('fim');
      setIsFinishDisabled(false);
    } else { setIsFinishDisabled(true); }
  };

  const isMealIngredientChecked = (value, name) => {
    let newList;
    if (ingredientsUsedList.includes((item) => item === value)) {
      newList = ingredientsUsedList.filter((item) => item !== value);
      const labelActual = document.getElementById(name);
      labelActual.classList.remove('checkedClass');
    } else if (!ingredientsUsedList.includes((item) => item === value)) {
      newList = [...ingredientsUsedList, value];
      const labelActual = document.getElementById(name);
      labelActual.classList.add('checkedClass');
    } else {
      newList = [value];
      const labelActual = document.getElementById(name);
      labelActual.classList.add('checkedClass');
    }
    const store = {
      meals: {
        [id]: [newList],
      },
    };
    const ingreList = JSON.parse(localStorage.getItem('inProgressRecipes'));
    localStorage.setItem('inProgressRecipes', JSON
      .stringify({ ...ingreList, ...store }));
  };

  const isDrinkIngredientChecked = (value, name) => {
    let newList;
    console.log(ingredientsUsedList);
    const labelActual = document.getElementById(name);
    if (ingredientsUsedList.includes((item) => item === value)) {
      newList = ingredientsUsedList.filter((item) => item !== value);
      labelActual.classList.remove('checkedClass');
    } else if (!ingredientsUsedList.includes((item) => item === value)) {
      newList = [...ingredientsUsedList, value];
      labelActual.classList.add('checkedClass');
    } else {
      newList = [value];
      labelActual.classList.add('checkedClass');
    }
    const store = {
      drinks: {
        [id]: [newList],
      },
    };
    const ingreList = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const moment = { ...ingreList, ...store };
    console.log(ingreList);
    console.log(moment);
    localStorage.setItem('inProgressRecipes', JSON
      .stringify({ ...ingreList, ...store }));
  };

  const handleChangeCheck = ({ target }) => {
    const { checked, name, value } = target;
    if (checked) {
      if (isMealInProgress) {
        isMealIngredientChecked(value, name);
      } else {
        isDrinkIngredientChecked(value, name);
      }
    }
    checkCanFinish();
  };

  useEffect(() => {
    const ingreList = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const checkedList = [];
    if (isMealInProgress && ingreList?.meals[id]) {
      setIngredientsUsedList(ingreList.meals[id]);
    } else if (!isMealInProgress && ingreList?.drinks) {
      console.log(ingreList);
      setIngredientsUsedList(ingreList.drinks[id]);
    }
    if (ingredients) {
      ingredients.forEach((ingred) => {
        if (ingredientsUsedList.find((item) => ingred === item)) {
          console.log('true');
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
