import React, { useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel } from 'react-bootstrap';
import AppContext from '../context/AppContext';

function CarouselCard() {
  const { recomendation } = useContext(AppContext);
  const [isMeal, setIsMeal] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const isThisPath = pathname.includes('/meals');
    setIsMeal(isThisPath);
  }, []);

  return (
    <div id="demo" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        {
          recomendation.map((reco, index) => (
            <div
              className={ index === 0 ? 'carousel-item active' : 'carousel-item' }
              key={ index }
              data-testid={ `${index}-recommendation-card` }
              style={ { height: '300px', width: '300px' } }
            >
              <img
                src={ isMeal ? recomendation[0].strMealThumb
                  : recomendation[0].strDrinkThumb }
                alt=""
                className="d-block w-100"
              />
              <div className="carousel-caption">
                <h3 data-testid={ `${index}-recommendation-title` }>
                  {isMeal ? reco.strMeal : reco.strDrink}
                </h3>
              </div>
            </div>
          ))
        }

      </div>

      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#demo"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" />
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#demo"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" />
      </button>
    </div>
  );
}

export default CarouselCard;

/* {
  (pathname.includes('/meals')) ? (
    <Carousel>
      {
        recomendation?.map((reco, index) => (
          <Carousel.Item key={ index }>
            <div data-testid={ `${index}-recommendation-card` }>
              <h3 data-testid={ `${index}-recommendation-title` }>
                {reco.strMeal}
              </h3>
            </div>
          </Carousel.Item>
        ))
      }
    </Carousel>
  ) : (
    <Carousel>
      {
        recomendation?.map((reco, index) => (
          <Carousel.Item key={ index }>
            <div data-testid={ `${index}-recommendation-card` }>
              <img src={ reco.strDrinkThumb } alt="" className="d-block w-100" />
              <Carousel.Caption>
                <h3 data-testid={ `${index}-recommendation-title` }>
                  {reco.strDrink}
                </h3>
              </Carousel.Caption>
            </div>
          </Carousel.Item>
        ))
      }
    </Carousel>
  );
} */
