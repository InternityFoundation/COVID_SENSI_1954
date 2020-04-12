import {combineReducers} from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import userReducer from './userReducer';
import homeReducer from './homeReducer';
import locationReducer from './locationReducer';




export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    user: userReducer,
    home:homeReducer,
    location:locationReducer
});
