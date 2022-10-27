import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AppContext from '../context/AppContext';
import Recipes from './Recipes';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Meals() {
  const { setMealsList, setIsMultipleMeals, setPath,
  } = useContext(AppContext);

  const { pathname } = useLocation();

  useEffect(() => {
    setPath(pathname);
    const fetchInitialApi = async () => {
      const TWELVE = 12;
      const endPoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      const response = await fetch(endPoint);
      const { meals } = await response.json();
      const filteredMeals = meals.filter((item, index) => index < TWELVE);
      setMealsList(filteredMeals);
      setIsMultipleMeals(true);
    };
    fetchInitialApi();
  }, [pathname, setIsMultipleMeals, setMealsList, setPath]);

  return (
    <div>
      <Header />
      <Recipes />
      <Footer />
    </div>

  );
}

export default Meals;
