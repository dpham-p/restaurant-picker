import React, { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

const Navbar = () => {
  const authContext = useContext(AuthContext);

  const { isAuthenticated, logoutUser } = authContext;

  return (
    <nav
      className='navbar navbar-expand-lg navbar-dark bg-dark'
      role='navigation'
    >
      <div className='container'>
        <Link to='/' className='navbar-brand'>
          <h1>Restaurant Picker</h1>
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon' />
        </button>

        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul className='navbar-nav mr-auto'>
            {isAuthenticated ? (
              <Fragment>
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
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
