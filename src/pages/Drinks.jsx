import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AppContext from '../context/AppContext';
import Recipes from '../components/Recipes';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Drinks() {
  const { setDrinksList, setIsMultipleDrinks, setPath, drinksList,
    setIsInitialDrinks, isInitialDrinks } = useContext(AppContext);

  const { pathname } = useLocation();

  useEffect(() => {
    setPath(pathname);
    const fetchInitialApi = async () => {
      const TWELVE = 12;
      const endPoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      const response = await fetch(endPoint);
      const { drinks } = await response.json();
      const filteredDrinks = drinks.filter((item, index) => index < TWELVE);
      setDrinksList(filteredDrinks);
      setIsMultipleDrinks(false);
      setIsInitialDrinks(true);
    };
    fetchInitialApi();
  }, []);

  return (
    <div>
      <Header />
      <div>
        {
          (isInitialDrinks) && (
            drinksList.map((drink, indexD) => (
              <div key={ drink.strDrink } data-testid={ `${indexD}-recipe-card` }>
                <Recipes
                  drink={ drink }
                  indexD={ indexD }
                />
              </div>
            )))
        }
      </div>
      <Footer />
    </div>
  );
}

export default Drinks;
