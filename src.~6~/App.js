import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Login from './Login'
import Home from './Home'

const App = () => (
   <Router>
      <Route path="/" exact component={Login}/>
      <Route path="/home" exact component={Home}/>
   </Router>
)

export default App;
