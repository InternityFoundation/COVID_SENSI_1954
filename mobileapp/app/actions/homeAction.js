import axios from 'axios';
import {LIST_POPULAR,POPULAR_LOADING,POPULAR_STOPLOADING,GET_ERRORS}from './types';
import {API_URL} from "./constant";
//Changes Packages
export const getPopular = (userData)=> dispatch => {
  dispatch(setLoading());
  axios.get(API_URL+'/api/package/')
       .then(res => {
         console.log("blood test",res.data)
          dispatch({
              type: LIST_POPULAR,
              payload:res.data
              })
       })
       .catch(err => {
        console.log("err",err)
          dispatch({
              type: GET_ERRORS,
              payload: err.response.data
          })
          dispatch(stopLoading());
       }
      );
};
// Popular loading
export const setLoading = () => {
  return {
    type: POPULAR_LOADING
  };
};
export const stopLoading = () => {
  return {
    type: POPULAR_STOPLOADING
  };
};