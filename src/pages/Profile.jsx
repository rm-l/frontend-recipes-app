import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Profile() {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div>
      <Header />
      <Footer />
      <div>
        <p data-testid="profile-email">
          E-mail:
          {' '}
          {user?.email}
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
