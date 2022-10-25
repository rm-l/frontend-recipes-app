import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div
      data-testid="footer"
      style={ { position: 'fixed', bottom: '0px' } }
    >
      <Link to="/meals">
        <button
          type="button"
          data-testid="meals-bottom-btn"
          src="../images/mealIcon.svg"
        >
          <img
            alt="comidas"
          />
        </button>
      </Link>
      <Link to="/drinks">
        <button
          type="button"
          data-testid="drinks-bottom-btn"
          src="../images/drinkIcon.svg"
        >
          <img alt="drinks" />
        </button>
      </Link>
    </div>
  );
}

export default Footer;
