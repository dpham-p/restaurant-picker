import React, { useReducer, useCallback } from 'react';
import FilterContext from './filterContext';
import FilterReducer from './filterReducer';
import axios from 'axios';

import {
  ADD_FILTERS,
  GET_FILTERS,
  UPDATE_FILTERS,
  CLEAR_FILTERS,
  FILTER_ERROR
} from '../types';

const FilterState = props => {
  const initialState = {
    filters: null,
    filter_loading: true
  };

  const [state, dispatch] = useReducer(FilterReducer, initialState);

  const getFilters = useCallback(async () => {
    try {
      const res = await axios.get('/api/filters');
      if (res.data) console.log('Filter Grabbed');
      dispatch({
        type: GET_FILTERS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: FILTER_ERROR,
        payload: err.response.msg
      });
    }
  }, []);

  const addFilters = useCallback(async () => {
    console.log('Adding filters');
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const filters = {
      categories: [
        'american',
        'chinese',
        'french',
        'greek',
        'italian',
        'japanese',
        'korean',
        'mexican',
        'thai',
        'vietnamese'
      ]
    };
    try {
      const res = await axios.post('/api/filters', filters, config);
      dispatch({
        type: ADD_FILTERS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: FILTER_ERROR,
        payload: err.response.msg
      });
    }
  }, []);

  const updateFilters = async filters => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    try {
      const res = await axios.put(
        `/api/filters/${filters._id}`,
        filters,
        config
      );
      console.log('Updated Filter');
      dispatch({
        type: UPDATE_FILTERS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: FILTER_ERROR,
        payload: err.response.msg
      });
    }
  };

  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS });
  };

  return (
    <FilterContext.Provider
      value={{
        filters: state.filters,
        filter_loading: state.filter_loading,
        addFilters,
        getFilters,
        updateFilters,
        clearFilters
      }}
    >
      {props.children}
    </FilterContext.Provider>
  );
};

export default FilterState;
