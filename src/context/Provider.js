import PropTypes from 'prop-types';
import React, { useState, useMemo } from 'react';
import AppContext from './AppContext';

function Provider({ children }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [path, setPath] = useState('');
  const [pageName, setPageName] = useState('');
  const [isPerfilIcon, setIsPerfilIcon] = useState(true);
  const [isSearchIcon, setIsSearchIcon] = useState(true);
  const [isSearchPressed, setIsSearchPressed] = useState(false);
  const [radioSearch, setRadioSearch] = useState('');
  const [inputSearch, setInputSearch] = useState('');
  const [meals, setMeals] = useState([]);

  const contextValue = useMemo(() => ({
    email,
    setEmail,
    password,
    setPassword,
    isDisabled,
    setIsDisabled,
    path,
    setPath,
    pageName,
    setPageName,
    isPerfilIcon,
    setIsPerfilIcon,
    isSearchIcon,
    setIsSearchIcon,
    isSearchPressed,
    setIsSearchPressed,
    radioSearch,
    setRadioSearch,
    inputSearch,
    setInputSearch,
    meals,
    setMeals,
  }), [email, password, isDisabled, path, pageName, isPerfilIcon, isSearchIcon,
    isSearchPressed, radioSearch, inputSearch, meals]);

  return (
    <AppContext.Provider value={ contextValue }>
      {children}
    </AppContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
