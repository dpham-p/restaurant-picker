import {
  GET_RESTAURANTS,
  GET_RESTAURANT_DETAILS,
  GET_LOCATION,
  CLEAR_RESTAURANT,
  SET_LOADING
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_RESTAURANTS:
      return {
        ...state,
        businesses: action.payload,
        restaurant_loading: false
      };
    case GET_RESTAURANT_DETAILS:
      return {
        ...state,
        restaurant: action.payload,
        restaurant_loading: false
      };
    case GET_LOCATION:
      return {
        ...state,
        latitude: action.payload.latitude,
        longitude: action.payload.longitude,
        restaurant_loading: false
      };
    case CLEAR_RESTAURANT:
      return {
        ...state,
        restaurant: null
      };
    case SET_LOADING:
      return {
        ...state,
        restaurant_loading: true
      };

    default:
      return state;
  }
};
