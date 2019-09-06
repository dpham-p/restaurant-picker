import {
  GET_FILTERS,
  ADD_FILTERS,
  UPDATE_FILTERS,
  CLEAR_FILTERS,
  FILTER_ERROR
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_FILTERS:
      return {
        ...state,
        filters: action.payload,
        filter_loading: false
      };
    case ADD_FILTERS:
      return {
        ...state,
        filters: action.payload,
        filter_loading: false
      };
    case UPDATE_FILTERS:
      return {
        ...state,
        filters: action.payload
      };
    case CLEAR_FILTERS:
      return {
        ...state,
        filters: null,
        filter_loading: true
      };
    case FILTER_ERROR:
    default:
      return state;
  }
};
