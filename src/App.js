import React from 'react';
// import './App.css';
import { Route,  Router } from 'react-router-dom'
import Dashboard from './components/Dashboard';
import LandingPage from './components/LandingPage/LandingPage';
import history from './history';
import { hotjar } from 'react-hotjar';
hotjar.initialize(1534851, 6);

function App() {
  return (
      <Router history={history}>
        <Route exact path="/" component={LandingPage} />
        <Route path="/dashboard" component={Dashboard} />
      </Router>
  );
}

export default App;
