import React, { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';

import Navigation from 'react-bootstrap/Navbar';

import AuthContext from '../../context/auth/authContext';
import YelpContext from '../../context/yelp/yelpContext';
import FilterContext from '../../context/filter/filterContext';

const Navbar = () => {
  const authContext = useContext(AuthContext);
  const yelpContext = useContext(YelpContext);
  const filterContext = useContext(FilterContext);

  const { clearRestaurant } = yelpContext;
  const { isAuthenticated, logoutUser, user } = authContext;
  const { clearFilters } = filterContext;

  const logout = () => {
    logoutUser();
    clearFilters();
    clearRestaurant();
  };

  return (
    <Navigation
      bg='dark'
      expand='lg'
      role='navigation'
      variant='dark'
      sticky='top'
    >
      <div className='container'>
        <Link to='/' className='d-flex navbar-brand'>
          <h2>Restaurant Picker</h2>
        </Link>

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
                  <a href='#!' className='nav-link' onClick={logout}>
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
