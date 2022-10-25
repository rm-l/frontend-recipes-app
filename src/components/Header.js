import React, { useContext, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import AppContext from '../context/AppContext';
import searchIcon from '../images/searchIcon.svg';
import profileIcon from '../images/profileIcon.svg';
import SearchBar from './SearchBar';

function Header() {
  const { path, setPath, pageName, setPageName, isPerfilIcon, isSearchPressed,
    setIsPerfilIcon, isSearchIcon, setIsSearchIcon, setIsSearchPressed,
  } = useContext(AppContext);

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

  const handleClickSearch = () => {
    setIsSearchPressed(!isSearchPressed);
  };

  return (
    <div>
      <h1 data-testid="page-title">{ pageName }</h1>
      {
        (isPerfilIcon) && (
          <Link to="/profile">
            <button
              type="button"
            >
              <img src={ profileIcon } alt="profile" data-testid="profile-top-btn" />
            </button>
          </Link>
        )
      }
      {
        (isSearchIcon) && (
          <>
            {
              (isSearchPressed) && (
                <SearchBar />
              )
            }
            <button
              type="button"
              onClick={ handleClickSearch }
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
