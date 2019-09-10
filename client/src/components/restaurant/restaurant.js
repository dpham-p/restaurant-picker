import React, { Fragment, useContext, useEffect, useState } from 'react';
import AuthContext from '../../context/auth/authContext';
import YelpContext from '../../context/yelp/yelpContext';
import FilterContext from '../../context/filter/filterContext';
import RestaurantItem from '../restaurant/RestaurantItem';
import Spinner from '../layout/Spinner';

import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Collapse from 'react-bootstrap/Collapse';

const Restaurant = () => {
  const restaurantTerms = [
    'American',
    'Chinese',
    'French',
    'Greek',
    'Indian',
    'Italian',
    'Japanese',
    'Korean',
    'Mexican',
    'Thai',
    'Vietnamese'
  ];
  const authContext = useContext(AuthContext);
  const yelpContext = useContext(YelpContext);
  const filterContext = useContext(FilterContext);

  const { loadUser, user } = authContext;
  const {
    getRestaurants,
    getLocation,
    restaurant,
    latitude,
    longitude,
    restaurant_loading
  } = yelpContext;

  const { filters, getFilters, updateFilters } = filterContext;

  const [open, setOpen] = useState(false);
  const [state, setState] = useState({
    categories: null
  });

  const { categories } = state;

  const selectAll = e => {
    const buttons = document.querySelectorAll('.rest-terms');
    setState({
      ...state,
      categories: restaurantTerms.map(term => {
        return term.toLowerCase();
      })
    });
    buttons.forEach(button => {
      button.classList.add('active');
    });
  };

  const onClick = e => {
    if (!e.target.className.includes('active')) {
      e.target.classList.add('active');
      setState({
        ...state,
        categories: [...categories, e.target.textContent.toLowerCase()]
      });
    } else {
      e.target.classList.remove('active');
      setState({
        ...state,
        categories: categories.filter(
          category => e.target.textContent.toLowerCase() !== category
        )
      });
    }
  };

  const onSubmit = e => {
    e.preventDefault();
    if (categories !== null && categories.length > 0) {
      let category = categories[Math.floor(Math.random() * categories.length)];

      category.toLowerCase();
      if (category === 'american') category = ['newamerican', 'tradamerican'];
      if (category === 'indian') category = 'indpak';

      getRestaurants({
        categories: category,
        latitude,
        longitude,
        sort_by: 'best_match',
        limit: 10
      });
      updateFilters({ ...filters, categories: categories });
      setOpen(false);
    }
  };

  const buttonUpdate = () => {
    const filterButtons = document.querySelectorAll('.rest-terms');
    filterButtons.forEach(button => {
      if (filters.categories.includes(button.textContent.toLowerCase())) {
        button.classList.add('active');
      } else {
        button.classList.remove('active');
      }
    });
    console.log('Button Updates');
  };
  useEffect(() => {
    if (user === null) loadUser();
    if (latitude === null || longitude === null) getLocation();
    if (filters === null) getFilters();
    if (filters) {
      setState({ ...state, categories: filters.categories });
      console.log('Updated categories');
    }
    // eslint-disable-next-line
  }, [getLocation, loadUser, getFilters, filters]);

  return (
    <Fragment>
      <div className='container p-5'>
        <Button
          variant='outline-primary'
          onClick={() => {
            setOpen(!open);
            buttonUpdate();
            setState({ ...state, categories: filters.categories });
            if (open) updateFilters({ ...filters, categories: categories });
          }}
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
                <Button variant='outline-dark' onClick={selectAll}>
                  Select All
                </Button>
              </ButtonGroup>
            </div>
            <div className='d-flex flex-wrap p-2'>
              {restaurantTerms.map((term, i) => (
                <Button
                  type='button'
                  variant='outline-dark'
                  className='rest-terms'
                  onClick={onClick}
                  key={i}
                >
                  {term}
                </Button>
              ))}
            </div>
          </div>
        </Collapse>

        {restaurant !== null && !restaurant_loading ? (
          <RestaurantItem restaurant={restaurant} />
        ) : restaurant_loading ? (
          <Spinner />
        ) : null}
      </div>
      <form className='d-flex justify-content-center' onSubmit={onSubmit}>
        {!restaurant_loading && (
          <input
            className='btn btn-primary btn-lg'
            type='submit'
            name='submit'
            value='Random'
          />
        )}
      </form>
    </Fragment>
  );
};

export default Restaurant;
