import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AppContext from '../context/AppContext';
import Recipes from './Recipes';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Drinks() {
  const { setDrinksList, setIsMultipleDrinks, setPath,
  } = useContext(AppContext);

  const { pathname } = useLocation();

  useEffect(() => {
    setPath(pathname);
    const fetchInitialApi = async () => {
      const TWELVE = 12;
      const endPoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      const response = await fetch(endPoint);
      const { drinks } = await response.json();
      const filteredDrinks = drinks?.filter((item, index) => index < TWELVE);
      setDrinksList(filteredDrinks);
      setIsMultipleDrinks(true);
    };
    fetchInitialApi();
  }, [pathname, setDrinksList, setIsMultipleDrinks, setPath]);

  return (
    <div>
      <Header />
      <Recipes />
      <Footer />
    </div>
  );
}

export default Drinks;
