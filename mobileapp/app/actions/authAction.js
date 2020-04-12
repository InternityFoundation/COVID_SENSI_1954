import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import {GET_ERRORS, SET_CURRENT_USER,LOADING,STOP_LOADING}from './types';
import {API_URL} from "./constant";
import {AsyncStorage} from 'react-native';
import NavigationService from '@Service/Navigation'


//Login - Get User Token
export const loginUser = (userData)=> dispatch => {
    dispatch(setLoading());
    axios.post(API_URL+'/api/user/login',userData)
         .then(res => {
            // Save to LocalStorage
            const {token} = res.data;
            //Set Token to Localstorage
            AsyncStorage.setItem('jwtToken',token);
            //Set Token to Header
            setAuthToken(token);
            //Decode Token to get user Data
            const decoded = jwt_decode(token);
            //set Current User
            dispatch(setCurrentUser(decoded));
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

export const registerUser = (userData)=> dispatch => {
    dispatch(setLoading());
    axios.post(API_URL+'/api/user/register',userData)
         .then(res => {
            // Save to LocalStorage
            const {token} = res.data;
            //Set Token to Localstorage
            AsyncStorage.setItem('jwtToken',token);
            //Set Token to Header
            setAuthToken(token);
            //Decode Token to get user Data
            const decoded = jwt_decode(token);
            //set Current User
            dispatch(setCurrentUser(decoded));
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



//set Logged in user
export const setCurrentUser = (decoded) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
};

//Log out users
export const logoutUser = (navigation)=> dispatch => {

    // Remove Token from localstorage
    AsyncStorage.removeItem('jwtToken').then((token) => {
        dispatch(setCurrentUser({}));
    //Remove Auth Header for future reference
    setAuthToken(false);
    navigation.navigate('LoginScreen')
    //set Current user to {} which will set isAuthenticated to false
    })
}


//Log out users
export const logoutCheck = (navigation)=> dispatch => {
    // Remove Token from localstorage
    AsyncStorage.removeItem('jwtToken').then((token) => {
        dispatch(setCurrentUser({}));
    //Remove Auth Header for future reference
    setAuthToken(false);
    //set Current user to {} which will set isAuthenticated to false
    })
}


// Profile loading
export const setLoading = () => {
    return {
      type: LOADING
    };
  };
  export const stopLoading = () => {
    return {
      type: STOP_LOADING
    };
  };