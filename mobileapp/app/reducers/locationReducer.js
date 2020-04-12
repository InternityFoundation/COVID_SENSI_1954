import {
    LOCATION_LOADING,
    ADD_LOCATION,
    EDIT_LOCATION,
    DELETE_LOCATION,
    LIST_LOCATION,
    LOCATION_STOPLOADING
  } from '../actions/types';
   
   const initialState = {
     addlocation: null,
     locationloading: false,
     editlocation:null,
     deletelocation:null,
     listlocation:null,
   };
   
   export default function(state = initialState, action) {
     switch (action.type) {
       case LOCATION_LOADING:
         return {
           ...state,
           locationloading: true
         };
         case LOCATION_STOPLOADING:
         return {
           ...state,
           locationloading: false
         };
         
       case ADD_LOCATION:
         return {
           ...state,
           addlocation: action.payload,
           locationloading: false
        };
        case EDIT_LOCATION:
         return {
           ...state,
           editlocation: action.payload,
           locationloading: false
        };
        case LIST_LOCATION:
        return {
          ...state,
          listlocation: action.payload,
          locationloading: false
       };
       case DELETE_LOCATION:
        return {
          ...state,
          deletelocation: action.payload,
          locationloading: false
       }; 
       default:
         return state;
     }
   }
   