import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Pages
import Login from './Login/Login';
import Home from './Home/Home';

const app = (
   <Router>
      <Switch>
         <Route path="/" exact component={Login} />
         <Route path="/home" exact component={Home} />
      </Switch>
   </Router>
);

render(app, document.getElementById('root'));
