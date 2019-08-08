import React, { Fragment, useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';
import YelpContext from '../../context/yelp/yelpContext';
import Settings from './Settings';

const Home = () => {
  const authContext = useContext(AuthContext);

  const { loadUser, user } = authContext;

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  return (
    <Fragment>
      <div className='jumbotron'>
        <div className='container'>
          <h1>Hello, {user && user.firstName}!</h1>
          <p>To get started, select some restaurant categories below.</p>
        </div>
      </div>
      <Settings />
    </Fragment>
  );
};

export default Home;
