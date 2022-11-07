import React, { useEffect, useContext, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import CarouselCard from '../components/CarouselCard';
import AppContext from '../context/AppContext';
import RecipeDetailsCard from '../components/RecipeDetailsCard';

function RecipeDetails() {
  const { recipe, setRecipe, /* coisas, */ setCoisas, /* isCopied, setIsCopied, */ isMeal,
    setIsMeal, /* isInProgress, */ setIsInProgess,
    setRecomendation } = useContext(AppContext);
  const [isFavorite, setIsFavorite] = useState(false);
  const [address, setAddress] = useState('');
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
        const prelink = result?.meals[0].strYoutube;
        if (prelink) {
          const link = (prelink.split('='))[1];
          setAddress(`https://www.youtube.com/embed/${link}`);
        }
        const a = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
        const b = await a.json();
        const c = b?.drinks?.filter((reco, index) => index < SIX);
        setRecomendation(c);
      }
      if (pathname === `/drinks/${id}`) {
        const response = await fetch((`${DRINK_ENDPOINT}${id}`));
        const result = await response.json();
        setRecipe(result.drinks);
        // const prelink = result?.drinks[0].strYoutube;
        // if (prelink) {
        //   const link = (prelink.split('='))[1];
        //   setAddress(`https://www.youtube.com/embed/${link}`);
        // }
        const c = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        const d = await c.json();
        const e = d?.meals?.filter((reco, index) => index < SIX);
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

  const mealFavoriteStorage = () => {
    const fave = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const favoriteMeal = {
      id,
      type: 'meal',
      nationality: recipe[0].strArea || '',
      category: recipe[0].strCategory || '',
      alcoholicOrNot: '',
      name: recipe[0].strMeal,
      image: recipe[0].strMealThumb,
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
      nationality: recipe[0].strArea || '',
      category: recipe[0].strCategory || '',
      alcoholicOrNot: recipe[0].strAlcoholic,
      name: recipe[0].strDrink,
      image: recipe[0].strDrinkThumb,
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
    if (isMeal) {
      mealFavoriteStorage();
    } else {
      drinkFavoriteStorage();
    }
  };

  useEffect(() => {
    const fave = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (fave !== null && fave?.find((item) => item.id === id)) {
      setIsFavorite(true);
    }
  }, [id]);

  return (
    <div>
      <CarouselCard />
      <RecipeDetailsCard
        handleClickFavorite={ handleClickFavorite }
        isFavorite={ isFavorite }
        address={ address }
      />
    </div>
  );
}

export default RecipeDetails;
