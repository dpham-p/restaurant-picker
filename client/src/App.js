import React from 'react';
import Navbar from './components/layout/Navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AuthState from './context/auth/AuthState';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import './custom.css';

const App = () => {
  return (
    <AuthState>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
        </Switch>
      </Router>
    </AuthState>
  );
};

export default App;
