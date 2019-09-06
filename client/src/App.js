import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import Navbar from './components/layout/Navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import Alerts from './components/layout/Alerts';

import AlertState from './context/alert/AlertState';
import AuthState from './context/auth/AuthState';
import YelpState from './context/yelp/YelpState';
import FilterState from './context/filter/FilterState';

import './custom.css';

const App = () => {
  return (
    <AuthState>
      <YelpState>
        <AlertState>
          <FilterState>
            <Router>
              <Navbar />
              <Alerts />
              <Switch>
                <PrivateRoute exact path='/' component={Home} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/register' component={Register} />
              </Switch>
            </Router>
          </FilterState>
        </AlertState>
      </YelpState>
    </AuthState>
  );
};

export default App;
