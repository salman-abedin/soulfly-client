import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// Pages
import Login from './Login/Login';
import Home from './Home/Home';

const app = (
   <Router>
      <Route path="/" exact component={Login} />
      <Route path="/home" exact component={Home} />
   </Router>
);

render(app, document.getElementById('root'));
