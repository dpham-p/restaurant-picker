import React, { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';

import Navigation from 'react-bootstrap/Navbar';

import AuthContext from '../../context/auth/authContext';

const Navbar = () => {
  const authContext = useContext(AuthContext);

  const { isAuthenticated, logoutUser, user } = authContext;

  return (
    <Navigation
      bg='dark'
      expand='lg'
      role='navigation'
      variant='dark'
      sticky='top'
    >
      <div className='container'>
        <Link to='/' className='navbar-brand'>
          <h2>Restaurant Picker</h2>
        </Link>
        <small className='navbar-brand'>Powered by Yelp</small>
        <Navigation.Toggle aria-controls='basic-navbar=nav' />
        <Navigation.Collapse id='basic-navbar-nav'>
          <ul className='navbar-nav mr-auto' />
          <ul className='navbar-nav'>
            {isAuthenticated ? (
              <Fragment>
                <li className='navbar-brand'>
                  Hello, {user && user.firstName}!
                </li>
                <li className='nav-item'>
                  <a href='#!' className='nav-link' onClick={logoutUser}>
                    Logout
                  </a>
                </li>
              </Fragment>
            ) : (
              <Fragment>
                <li className='nav-item'>
                  <Link to='/login' className='nav-link'>
                    Login
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link
                    to='/register'
                    className='nav-link'
                    tabIndex='-1'
                    aria-disabled='true'
                  >
                    Register
                  </Link>
                </li>
              </Fragment>
            )}
          </ul>
        </Navigation.Collapse>
      </div>
    </Navigation>
  );
};

export default Navbar;
