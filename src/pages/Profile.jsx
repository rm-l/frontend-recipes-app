import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Profile() {
  return (
    <div>
      <Header />
      <Footer />
      <div>
        <p data-testid="profile-email">
          E-mail:
        </p>
        {' '}
        <button
          type="button"
          data-testid="profile-done-btn"
        >
          Done Recipes
        </button>
        {' '}
        <button
          type="button"
          data-testid="profile-favorite-btn"
        >
          Receitas Favoritas
        </button>
        {' '}
        <button
          type="button"
          data-testid="profile-logout-btn"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Profile;
