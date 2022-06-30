import React from 'react';

import './App.css';
import Landing from './Components/Landing/Landing';
import HomePage from './Components/HomePage/HomePage'
import BreedDetail from './Components/BreedDetail/BreedDetail';
import About from './Components/About/About';
import Create from './Components/Create/Create';
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
        <Route path='/about'>
          <About />
        </Route>
        <Route path='/create'>
          <Create />
        </Route>
      </Switch>
    </React.Fragment>
  );
}

export default App;
