import React, { useReducer, useCallback } from 'react';
import YelpContext from './yelpContext';
import YelpReducer from './yelpReducer';
import axios from 'axios';
import { GET_RESTAURANTS, RANDOM_RESTAURANT, GET_LOCATION } from '../types';

const YelpState = props => {
  const initialState = {
    businesses: [],
    restaurant: [],
    loading: true,
    latitude: '',
    longitude: ''
  };

  const [state, dispatch] = useReducer(YelpReducer, initialState);

  //  Get Restaurants
  const getRestaurants = async params => {
    try {
      const res = await axios.get('/api/yelp', {
        params: params
      });
      dispatch({ type: GET_RESTAURANTS, payload: res.data });
      randomRestaurant(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  //  Random Restaurant
  const randomRestaurant = businesses => {
    const restaurant =
      businesses[Math.floor(Math.random() * businesses.length)];
    dispatch({ type: RANDOM_RESTAURANT, payload: restaurant });
  };

  //  Get Location
  const getLocation = useCallback(async () => {
    try {
      const geolocation = navigator.geolocation;

      const res = await new Promise((resolve, reject) => {
        geolocation.getCurrentPosition(position => resolve(position));
      });
      dispatch({ type: GET_LOCATION, payload: res });
    } catch (err) {
      console.log('Geolocation not available');
    }
  }, []);

  return (
    <YelpContext.Provider
      value={{
        businesses: state.businesses,
        restaurant: state.restaurant,
        latitude: state.latitude,
        longitude: state.longitude,
        getRestaurants,
        getLocation
      }}
    >
      {props.children}
    </YelpContext.Provider>
  );
};

export default YelpState;
