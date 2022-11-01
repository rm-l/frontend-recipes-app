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
    if (!isIngredientUsedList.some((item) => item === false)) {
      setIsFinishDisabled(false);
    } else { setIsFinishDisabled(true); }
  };

  const isMealIngredientChecked = (value, name, index) => {
    let newList;
    const labelActual = document.getElementById(name);
    if (ingredientsUsedList.includes(value)) {
      newList = ingredientsUsedList.filter((item) => item !== value);
      labelActual.classList.remove('checkedClass');
      isIngredientUsedList[index] = false;
    } else if (!ingredientsUsedList.includes(value)) {
      newList = [...ingredientsUsedList, value];
      labelActual.classList.add('checkedClass');
      isIngredientUsedList[index] = true;
    }
    const store = {
      meals: {
        [id]: newList,
      },
    };
    const ingreList = JSON.parse(localStorage.getItem('inProgressRecipes'));
    localStorage.setItem('inProgressRecipes', JSON
      .stringify({ ...ingreList, ...store }));
    setIngredientsUsedList(newList);
  };

  const isDrinkIngredientChecked = (value, name, index) => {
    let newList;
    const labelActual = document.getElementById(name);
    if (ingredientsUsedList.includes(value)) {
      newList = ingredientsUsedList.filter((item) => item !== value);
      labelActual.classList.remove('checkedClass');
      isIngredientUsedList[index] = false;
    } else if (!ingredientsUsedList.includes(value)) {
      newList = [...ingredientsUsedList, value];
      labelActual.classList.add('checkedClass');
      isIngredientUsedList[index] = true;
    }
    const store = {
      drinks: {
        [id]: newList,
      },
    };
    const ingreList = JSON.parse(localStorage.getItem('inProgressRecipes'));
    localStorage.setItem('inProgressRecipes', JSON
      .stringify({ ...ingreList, ...store }));
    setIngredientsUsedList(newList);
  };

  const handleChangeCheck = (target, index) => {
    const { name, value } = target;
    if (isMealInProgress) {
      isMealIngredientChecked(value, name, index);
    } else {
      isDrinkIngredientChecked(value, name, index);
    }
    checkCanFinish();
  };

  useEffect(() => {
    const ingreList = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (isMealInProgress && ingreList?.meals[id]) {
      setIngredientsUsedList(ingreList.meals[id]);
    } else if (!isMealInProgress && ingreList?.drinks) {
      setIngredientsUsedList(ingreList.drinks[id]);
    }
  }, [id, isMealInProgress, setIngredientsUsedList]);

  useEffect(() => {
    if (ingredients) {
      const checkedList = ingredients
        .map((ingred) => ingredientsUsedList.includes(ingred));
      setIsIngredientUsedList(checkedList);
    }
    checkCanFinish();
  }, [ingredients, ingredientsUsedList]);

  const handleClickFinish = () => {
    const oldDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    const momentDate = new Date();
    const tags = recipeInProgress[0].strTags?.split(',');
    const isTag = Boolean(tags);
    const newDoneRecipe = {
      id,
      type: isMealInProgress ? 'meal' : 'drink',
      nationality: recipeInProgress[0].strArea || '',
      category: recipeInProgress[0].strCategory || '',
      alcoholicOrNot: recipeInProgress[0].strAlcoholic || '',
      name: isMealInProgress ? recipeInProgress[0].strMeal : recipeInProgress[0].strDrink,
      image: isMealInProgress ? recipeInProgress[0].strMealThumb
        : recipeInProgress[0].strDrinkThumb,
      doneDate: momentDate.toISOString(),
      tags: isTag ? [...tags] : [],
    };
    if (oldDoneRecipes) {
      const newDoneRecipes = [...oldDoneRecipes, newDoneRecipe];
      localStorage.setItem('doneRecipes', JSON.stringify(newDoneRecipes));
    } else {
      const newDoneRecipes = [newDoneRecipe];
      localStorage.setItem('doneRecipes', JSON.stringify(newDoneRecipes));
    }
  };

  return (
    <div>
      <RecipeInProgressCard
        handleChangeCheck={ handleChangeCheck }
        handleClickFinish={ handleClickFinish }
      />
    </div>
  );
}

export default RecipeInProgress;
