import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Meals() {
  return (
    <div>
      <Header />
      <Footer data-testid="footer" />
    </div>

  );
}

export default Meals;
