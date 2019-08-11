import React, { Fragment, useContext, useEffect, useState } from 'react';
import AuthContext from '../../context/auth/authContext';
import YelpContext from '../../context/yelp/yelpContext';
import RestaurantItem from '../restaurant/RestaurantItem';

import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Collapse from 'react-bootstrap/Collapse';

const Home = () => {
  const restaurantTerms = [
    'American',
    'Chinese',
    'French',
    'Greek',
    'Italian',
    'Japanese',
    'Korean',
    'Mexican',
    'Thai',
    'Vietnamese'
  ];
  const authContext = useContext(AuthContext);
  const yelpContext = useContext(YelpContext);

  const { loadUser, user } = authContext;
  const {
    getRestaurants,
    getLocation,
    businesses,
    restaurant,
    latitude,
    longitude
  } = yelpContext;

  useEffect(() => {
    getLocation();
    loadUser();
  }, [loadUser, getLocation]);

  const [state, setState] = useState({
    terms: restaurantTerms,
    location: 'Lincoln, NE',
    allActive: true
  });

  const [open, setOpen] = useState(false);

  const { terms, location, allActive } = state;

  const selectAll = e =>
    setState({
      ...state,
      terms: restaurantTerms,
      allActive: true
    });

  const clearAll = e => setState({ ...state, terms: [], allActive: false });

  const onClick = e => {
    if (!e.target.className.includes('active')) {
      e.target.classList.add('active');
      setState({ ...state, terms: [...terms, e.target.textContent] });
    } else {
      e.target.classList.remove('active');
      setState({
        ...state,
        terms: terms.filter(term => e.target.textContent !== term)
      });
    }
  };

  const onSubmit = e => {
    e.preventDefault();
    if (terms.length > 0) {
      const term = terms[Math.floor(Math.random() * terms.length)];

      getRestaurants({
        term,
        latitude,
        longitude,
        limit: 10,
        sort_by: 'rating'
      });
    }
  };

  return (
    <Fragment>
      <div className='container' style={{ paddingTop: '2rem' }}>
        <Button
          variant='secondary'
          onClick={() => setOpen(!open)}
          aria-controls='restaurantTypes'
          aria-expanded={open}
        >
          Filter
        </Button>
        <Collapse in={open}>
          <div id='restaurantTypes'>
            <div className='d-flex justify-content-between'>
              <h4>Restaurant Types</h4>
              <ButtonGroup>
                <Button variant='dark' onClick={selectAll}>
                  Select All
                </Button>
                <Button variant='outline-dark' onClick={clearAll}>
                  Clear All
                </Button>
              </ButtonGroup>
            </div>
            <div className='flex-wrap'>
              {restaurantTerms.map((term, i) => (
                <Button
                  type='button'
                  variant='outline-dark'
                  className={`rest-terms ${allActive ? 'active' : ''}`}
                  onClick={onClick}
                  key={i}
                >
                  {term}
                </Button>
              ))}
            </div>
          </div>
        </Collapse>
        {businesses.length > 0 && <RestaurantItem restaurant={restaurant} />}
      </div>

      <form className='d-flex justify-content-center' onSubmit={onSubmit}>
        <input
          className='btn btn-primary btn-lg'
          type='submit'
          name='submit'
          value='Random'
        />
      </form>
    </Fragment>
  );
};

export default Home;
