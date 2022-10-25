import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import Provider from './context/Provider';
import Login from './pages/Login';
import Meals from './pages/Meals';
import Drinks from './pages/Drinks';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
// import Recipes from './pages/Recipes';
import RecipeDetails from './pages/RecipeDetails';

function App() {
  return (
    <Switch>
      <Provider>
        <Route exact path="/" component={ Login } />
        <Route path="/meals" component={ Meals } />
        <Route path="/drinks" component={ Drinks } />
        <Route path="/meals/:id" component={ RecipeDetails } />
        <Route path="/drinks/:id" component={ RecipeDetails } />
        <Route path="/meals/:id/in-progress" /* component={ RecipeInProgress } */ />
        <Route path="/drinks/:id/in-progress" /* component={ RecipeInProgress } */ />
        <Route path="/profile" component={ Profile } />
        <Route path="/done-recipes" component={ DoneRecipes } />
        <Route path="/favorite-recipes" component={ FavoriteRecipes } />
      </Provider>
    </Switch>
  );
}

export default App;
