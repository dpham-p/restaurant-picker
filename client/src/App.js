import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import Navbar from './components/layout/Navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';

import AuthState from './context/auth/AuthState';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import './custom.css';
import YelpState from './context/yelp/YelpState';

const App = () => {
  return (
    <AuthState>
      <YelpState>
        <Router>
          <Navbar />
          <Switch>
            <PrivateRoute exact path='/' component={Home} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
          </Switch>
        </Router>
      </YelpState>
    </AuthState>
  );
};

export default App;
