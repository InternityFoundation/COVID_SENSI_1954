import axios from 'axios';
import {
  LOCATION_LOADING,
  LOCATION_STOPLOADING,
  ADD_LOCATION,
  EDIT_LOCATION,
  DELETE_LOCATION,
  LIST_LOCATION,
  GET_ERRORS,
} from './types';
import{API_URL} from './constant'

// Get all location
export const listLocation= () => dispatch => {
  dispatch(setLocationLoading());
  axios
    .get(API_URL+'/api/location/getlocation')
    .then(res =>{
      dispatch({
        type: LIST_LOCATION,
        payload:res.data
      })
    })
    .catch(err =>{
      dispatch({
        type: GET_ERRORS,
        payload:err.response.data
      })

    });
};


// Location loading
export const setLocationLoading = () => {
    return {
      type: LOCATION_LOADING
    };
  };
  export const stopLocationLoading = () => {
    return {
      type: LOCATION_STOPLOADING
    };
  };