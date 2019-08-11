import { GET_RESTAURANTS, RANDOM_RESTAURANT, GET_LOCATION } from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_RESTAURANTS:
      return {
        ...state,
        businesses: action.payload
      };
    case RANDOM_RESTAURANT:
      return {
        ...state,
        loading: false,
        restaurant: action.payload
      };
    case GET_LOCATION:
      return {
        ...state,
        latitude: action.payload.coords.latitude,
        longitude: action.payload.coords.longitude
      };
    default:
      return state;
  }
};
