import PropTypes from 'prop-types';
import React, { useState, useMemo } from 'react';
import AppContext from './AppContext';

function Provider({ children }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [path, setPath] = useState('');
  const [pageName, setPageName] = useState('');
  const [isPerfilIcon, setIsPerfilIcon] = useState(true);
  const [isSearchIcon, setIsSearchIcon] = useState(true);
  const [isSearchPressed, setIsSearchPressed] = useState(false);
  const [radioSearch, setRadioSearch] = useState('');
  const [inputSearch, setInputSearch] = useState('');
  const [mealsList, setMealsList] = useState([]);
  const [drinksList, setDrinksList] = useState([]);
  const [isMultipleMeals, setIsMultipleMeals] = useState(false);
  const [isMultipleDrinks, setIsMultipleDrinks] = useState(false);
  const [mealCategories, setMealCategories] = useState([]);
  const [drinkCategories, setDrinkCategories] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [recipeInProgress, setRecipeInProgress] = useState([]);
  const [isMealInProgress, setIsMealInProgress] = useState(false);
  const [isDrinkInProgress, setIsDrinkInProgress] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);
  const [ingredientsUsedList, setIngredientsUsedList] = useState([]);
  const [isIngredientUsedList, setIsIngredientUsedList] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const contextValue = useMemo(() => ({
    email,
    setEmail,
    password,
    setPassword,
    isDisabled,
    setIsDisabled,
    path,
    setPath,
    pageName,
    setPageName,
    isPerfilIcon,
    setIsPerfilIcon,
    isSearchIcon,
    setIsSearchIcon,
    isSearchPressed,
    setIsSearchPressed,
    radioSearch,
    setRadioSearch,
    inputSearch,
    setInputSearch,
    mealsList,
    setMealsList,
    drinksList,
    setDrinksList,
    isMultipleMeals,
    setIsMultipleMeals,
    isMultipleDrinks,
    setIsMultipleDrinks,
    mealCategories,
    setMealCategories,
    drinkCategories,
    setDrinkCategories,
    isFiltered,
    setIsFiltered,
    recipeInProgress,
    setRecipeInProgress,
    isMealInProgress,
    setIsMealInProgress,
    isDrinkInProgress,
    setIsDrinkInProgress,
    ingredients,
    setIngredients,
    measures,
    setMeasures,
    ingredientsUsedList,
    setIngredientsUsedList,
    isIngredientUsedList,
    setIsIngredientUsedList,
  }), [email, password, isDisabled, path, pageName, isPerfilIcon, isSearchIcon,
    isSearchPressed, radioSearch, inputSearch, mealsList, drinksList, isMultipleMeals,
    isMultipleDrinks, mealCategories, drinkCategories, isFiltered, recipeInProgress,
    isMealInProgress, isDrinkInProgress, ingredients, measures, ingredientsUsedList,
    isIngredientUsedList]);

  const secondContext = useMemo(() => ({
    favorites,
    setFavorites,
  }), [favorites]);

  const principalContext = useMemo(
    () => ({ ...contextValue, ...secondContext }),
    [contextValue, secondContext],
  );

  return (
    <AppContext.Provider value={ principalContext }>
      {children}
    </AppContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
