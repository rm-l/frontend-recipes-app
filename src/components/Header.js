import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AppContext from '../context/AppContext';
import searchIcon from '../images/searchIcon.svg';
import profileIcon from '../images/profileIcon.svg';

function Header() {
  const { path, setPath, pageName, setPageName, isPerfilIcon,
    setIsPerfilIcon, isSearchIcon, setIsSearchIcon } = useContext(AppContext);

  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname) {
      setPath(pathname);
    }
    if (path === '/meals') {
      setPageName('Meals');
      setIsPerfilIcon(true);
      setIsSearchIcon(true);
    } else if (path === '/drinks') {
      setPageName('Drinks');
      setIsPerfilIcon(true);
      setIsSearchIcon(true);
    } else if (path === '/profile') {
      setPageName('Profile');
      setIsPerfilIcon(true);
      setIsSearchIcon(false);
    } else if (path === '/done-recipes') {
      setPageName('Done Recipes');
      setIsPerfilIcon(true);
      setIsSearchIcon(false);
    } else if (path === '/favorite-recipes') {
      setPageName('Favorite Recipes');
      setIsPerfilIcon(true);
      setIsSearchIcon(false);
    } else {
      setPageName('');
      setIsPerfilIcon(false);
      setIsSearchIcon(false);
    }
  }, [path, pathname, setIsPerfilIcon, setIsSearchIcon, setPageName, setPath]);

  return (
    <div>
      <h1 data-testid="page-title">{ pageName }</h1>
      {
        (isPerfilIcon) && (
          <button
            type="button"
          >
            <img src={ profileIcon } alt="profile" data-testid="profile-top-btn" />
          </button>
        )
      }
      {
        (isSearchIcon) && (
          <>
            <input
              type="text"
              name="search-input"
              id="search-input"
              data-testid="search-input"
            />
            <button
              type="button"
            >
              <img src={ searchIcon } alt="search" data-testid="search-top-btn" />
            </button>
          </>
        )
      }
    </div>
  );
}

export default Header;
