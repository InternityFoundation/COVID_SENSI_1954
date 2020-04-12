import isEmpty from '../validation/is-empty';

import { SET_CURRENT_USER,LOADING,STOP_LOADING } from "../actions/types";


const initialState = {
    isAuthenticated: false,
    user: {},
    loading:false
}

export default function(state=initialState, action){
    switch(action.type){
        case LOADING:
        return {
          ...state,
          loading: true
        };
        case STOP_LOADING:
        return {
          ...state,
          loading: false
        };
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload,
                loading: false
            }
        default:
            return state;
    }
}