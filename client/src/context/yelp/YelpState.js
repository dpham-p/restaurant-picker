import React, { useReducer, useCallback } from 'react';
import YelpContext from './yelpContext';
import YelpReducer from './yelpReducer';
import axios from 'axios';

import {
  GET_RESTAURANTS,
  GET_RESTAURANT_DETAILS,
  GET_LOCATION,
  LOCATION_ERROR,
  CLEAR_RESTAURANT,
  SET_LOADING
} from '../types';

const YelpState = props => {
  const initialState = {
    businesses: [],
    restaurant: null,
    restaurant_loading: null,
    location: null,
    latitude: null,
    longitude: null
  };

  const [state, dispatch] = useReducer(YelpReducer, initialState);

  //  Get Restaurants
  const getRestaurants = async params => {
    try {
      const res = await axios.get('/api/yelp', {
        params: params
      });

      dispatch({ type: SET_LOADING });
      dispatch({ type: GET_RESTAURANTS, payload: res.data });

      randomRestaurant(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  //  Get Restaurant Details
  const getRestaurantDetails = async restaurant => {
    try {
      const res = await axios.get(`/api/yelp/${restaurant.id}`);
      dispatch({ type: SET_LOADING });
      dispatch({ type: GET_RESTAURANT_DETAILS, payload: res.data });
    } catch (err) {
      console.log(err);
    }
  };

  //  Random Restaurant
  const randomRestaurant = businesses => {
    const restaurant =
      businesses[Math.floor(Math.random() * businesses.length)];
    getRestaurantDetails(restaurant);
  };

  //  Get Location
  const getLocation = useCallback(async () => {
    try {
      const geolocation = navigator.geolocation;

      const res = await new Promise((resolve, reject) => {
        geolocation.getCurrentPosition(position => resolve(position));
      });

      dispatch({ type: SET_LOADING });
      dispatch({ type: GET_LOCATION, payload: res.coords });
      console.log('Location loaded');
    } catch (err) {
      dispatch({ type: LOCATION_ERROR, payload: err.response.msg });
    }
  }, []);

  const clearRestaurant = () => {
    dispatch({ type: CLEAR_RESTAURANT });
  };

  return (
    <YelpContext.Provider
      value={{
        restaurant: state.restaurant,
        restaurant_loading: state.restaurant_loading,
        latitude: state.latitude,
        longitude: state.longitude,
        getRestaurants,
        getRestaurantDetails,
        getLocation,
        clearRestaurant
      }}
    >
      {props.children}
    </YelpContext.Provider>
  );
};

export default YelpState;
