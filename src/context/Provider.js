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
  }), [email, password, isDisabled, path, pageName,
    isPerfilIcon, isSearchIcon, isSearchPressed]);

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
