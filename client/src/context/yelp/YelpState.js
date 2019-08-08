import React, { useReducer } from 'react';
import YelpContext from './yelpContext';
import YelpReducer from './yelpReducer';
import axios from 'axios';
import { GET_RESTAURANTS } from '../types';

const YelpState = props => {
  const initialState = {
    businesses: [],
    term: ''
  };

  const [state, dispatch] = useReducer(YelpReducer, initialState);

  //  Get Restaurants
  const getRestaurants = async searchConfig => {
    try {
      const res = await axios.get('/api/yelp', {
        params: searchConfig
      });
      dispatch({ type: GET_RESTAURANTS, payload: res.data });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <YelpContext.Provider
      value={{
        businesses: state.businesses,
        getRestaurants
      }}
    >
      {props.children}
    </YelpContext.Provider>
  );
};

export default YelpState;
