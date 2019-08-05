import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
    case REGISTER_FAIL:
    case LOGIN_SUCCESS:
    case LOGIN_FAIL:
    default:
      return state;
  }
};
