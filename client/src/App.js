import React from 'react';

import './App.css';
import Landing from './Components/Landing/Landing';
import NavBar from './Components/NavBar/NavBar';
import { Route,Switch } from 'react-router-dom';

function App() {
  return (
    <React.Fragment>
      <Switch>
        <Route exact path='/'>
          <Landing />
        </Route>
          <NavBar />
        <Route path='/home'>
          
        </Route>
      </Switch>
    </React.Fragment>
  );
}

export default App;
