import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import Provider from './context/Provider';
import Login from './pages/Login';

function App() {
  return (
    <Switch>
      <Provider>
        <Route exact patch="/" component={ Login } />
      </Provider>
    </Switch>
  );
}

export default App;
