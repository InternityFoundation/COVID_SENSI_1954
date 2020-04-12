import {
    POPULAR_LOADING,
    LIST_POPULAR,
    POPULAR_STOPLOADING
  } from '../actions/types';
   
   const initialState = {
     popularloading: false,
     listpopular:null,
   };
   
   export default function(state = initialState, action) {
     switch (action.type) {
       case POPULAR_LOADING:
         return {
           ...state,
           popularloading: true
         };
         case POPULAR_STOPLOADING:
         return {
           ...state,
           popularloading: false
         };
        case LIST_POPULAR:
        return {
          ...state,
          listpopular: action.payload,
          popularloading: false
       }; 
       default:
         return state;
     }
   }
   