import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import AppContext from './AppContext';

function Provider({ children }) {
  const contextValue = useMemo(() => ({

  }), []);

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
