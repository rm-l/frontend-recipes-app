import React, { useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import AppContext from '../context/AppContext';
import 'bootstrap/dist/css/bootstrap.min.css';

function CarouselCard() {
  const { recomendation } = useContext(AppContext);
  const [isMeal, setIsMeal] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const isThisPath = pathname.includes('/meals');
    setIsMeal(isThisPath);
  }, []);

  return (
    <Carousel>
      {
        recomendation?.map((reco, index) => (
          <Carousel.Item
            key={ index }
            data-testid={ `${index}-recommendation-card` }
            className="carousel"
          >
            <img
              src={ isMeal ? reco.strDrinkThumb : reco.strMealThumb }
              alt=""
              className="d-block w-100"
              style={ { height: '200px' } }
            />
            <Carousel.Caption>
              <h3 data-testid={ `${index}-recommendation-title` }>
                {isMeal ? reco.strDrink : reco.strMeal}
              </h3>
            </Carousel.Caption>
          </Carousel.Item>
        ))
      }
    </Carousel>
  );
}

export default CarouselCard;
