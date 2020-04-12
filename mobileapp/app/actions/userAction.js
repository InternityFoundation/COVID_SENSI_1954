import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import {
  GET_POPULAR,
  POPULAR_LOADING,
  USER_LOADING,
  USER_STOP_LOADING,
  GET_ERRORS,
  GET_PRODUCTS,
  LOADING,
  STOP_LOADING,
  CREATE_TRANSCATION,
  WALLET_INFORMATION,
  ORDER_INFORMATION,
  LIST_BLOODTEST,
  BLOODTEST_LOADING,
  BLOODTEST_STOPLOADING,
  LIST_PACKAGE,
  PACKAGE_LOADING,
  PACKAGE_STOPLOADING,
  LIST_REPORT,
  REPORT_LOADING,
  REPORT_STOPLOADING,
}from './types';
import {API_URL} from "./constant";
import {AsyncStorage} from 'react-native';
import NavigationService from '@Service/Navigation'



export const createTransaction = (userData)=> dispatch => {
    dispatch(setLoading());
    axios.post(API_URL+'/updateBalance',userData)
         .then(res => {
           console.log("res",res.data);
            dispatch({
                type: CREATE_TRANSCATION,
                payload:res.data
                })
         })
         .catch(err => {
          console.log("err",err);
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
            dispatch(stopLoading());
         }
        );
};


export const walletInformation = (userData)=> dispatch => {
  dispatch(setLoading());
  axios.get(API_URL+'/walletInformation',userData)
       .then(res => {
         console.log("res",res.data);
          dispatch({
              type: WALLET_INFORMATION,
              payload:res.data
              })
       })
       .catch(err => {
        console.log("err",err);
          dispatch({
              type: GET_ERRORS,
              payload: err.response.data
          })
          dispatch(stopLoading());
       }
      );
};

export const orderInformation = (userData)=> dispatch => {
  dispatch(setLoading());
  axios.all([
    axios.get(API_URL+'/api/booking/unassigneduser'),
    axios.get(API_URL+'/api/booking/assigneduser'),
    axios.get(API_URL+'/api/booking/completeduser'),
  ]).then(axios.spread((unassigned, assigned,completed) => {
      var data={
      unassigned:unassigned.data,
      assigned:assigned.data,
      completed:completed.data,
    }
          dispatch({
              type: ORDER_INFORMATION,
              payload:data,
            })
    }))
       .catch(err => {
          dispatch({
              type: GET_ERRORS,
              payload: err.response.data
          })
          dispatch(stopLoading());
       })
};

export const getProducts = (userData)=> dispatch => {
  dispatch(setLoading());
  axios.get(API_URL+'/getAllProductlist')
       .then(res => {
          dispatch({
              type: GET_PRODUCTS,
              payload:res.data
              })
       })
       .catch(err => {
        console.log("err",err);
          dispatch({
              type: GET_ERRORS,
              payload: err.response.data
          })
          dispatch(stopLoading());
       }
      );
};

export const getPackage = (userData)=> dispatch => {
  dispatch({type: PACKAGE_LOADING,});
  axios.get(API_URL+'/api/package/')
       .then(res => {
          dispatch({
              type: LIST_PACKAGE,
              payload:res.data
              })
       })
       .catch(err => {
        console.log("err",err);
          dispatch({
              type: GET_ERRORS,
              payload: err.response.data
          })
          dispatch({type: PACKAGE_STOPLOADING});
       }
      );
};

export const getBloodtest = (userData)=> dispatch => {
  dispatch({type: BLOODTEST_LOADING});
  axios.get(API_URL+'/api/bloodtest/')
       .then(res => {
          dispatch({
              type: LIST_BLOODTEST,
              payload:res.data
              })
       })
       .catch(err => {
          dispatch({
              type: GET_ERRORS,
              payload: err.response.data
          })
          dispatch({type: BLOODTEST_STOPLOADING});
       }
      );
};

export const getReport = (userData)=> dispatch => {
  dispatch({type: REPORT_LOADING});
  axios.get(API_URL+'/api/report/getuser')
       .then(res => {
          dispatch({
              type: LIST_REPORT,
              payload:res.data
              })
       })
       .catch(err => {
          dispatch({
              type: GET_ERRORS,
              payload: err.response.data
          })
          dispatch({type: REPORT_STOPLOADING});
       }
      );
};

// Profile loading
export const setLoading = () => {
    return {
      type: USER_LOADING
    };
  };
  export const stopLoading = () => {
    return {
      type: USER_STOP_LOADING
    };
  };
