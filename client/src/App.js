import React from 'react';

import './App.css';
import Landing from './Pages/Landing/Landing';
import HomePage from './Pages/HomePage/HomePage';
import BreedDetail from './Pages/BreedDetail/BreedDetail';
import Create from './Pages/Create/Create';
import Error from './Pages/Error/Error';
import { Route,Switch } from 'react-router-dom';

function App() {
  return (
    <React.Fragment>
      <Switch>
        <Route exact path='/'>
          <Landing />
        </Route>
        <Route path='/home'>
          <HomePage />
        </Route>
        <Route path='/breed/:id'>
          <BreedDetail />
        </Route>
        <Route path='/create'>
          <Create />
        </Route>
        <Route path='/'>
          <Error />
        </Route>
      </Switch>
    </React.Fragment>
  );
}

export default App;
