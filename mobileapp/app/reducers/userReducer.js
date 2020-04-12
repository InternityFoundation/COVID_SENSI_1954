import isEmpty from '../validation/is-empty';

import {
    USER_LOADING,
    USER_STOP_LOADING,
    GET_PRODUCTS,
    CREATE_TRANSCATION,
    LOADING,STOP_LOADING,
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
} from "../actions/types";


const initialState = {
    createTransaction:null,
    walletInformation:null,
    orderInformation:null,
    userloading:false,
    getproducts:null,
    listpackage:null,
    listbloodtest:null,
    bloodtestloading:false,
    listpackage:null,
    packageloading:false,
    listreport:null,
    reportloading:false,
}

export default function(state=initialState, action){
    switch(action.type){
        case USER_LOADING:
        return {
          ...state,
          userloading: true
        };
        case BLOODTEST_LOADING:
        return {
          ...state,
          bloodtestloading: true
        };
        case PACKAGE_LOADING:
        return {
          ...state,
          packageloading: true
        };
        case BLOODTEST_STOPLOADING:
        return {
          ...state,
          bloodtestloading: false
        };
        case PACKAGE_STOPLOADING:
        return {
          ...state,
          packageloading: false
        };
        case USER_STOP_LOADING:
        return {
          ...state,
          userloading: false
        };
        case LIST_PACKAGE:
        return {
            ...state,
            listpackage: action.payload,
            packageloading: false
        }
        case LIST_BLOODTEST:
        return {
            ...state,
            listbloodtest: action.payload,
            bloodtestloading: false
        }
        case CREATE_TRANSCATION:
            return {
                ...state,
                createTransaction: action.payload,
                userloading: false
        }
        case WALLET_INFORMATION:
        return {
            ...state,
            walletInformation: action.payload,
            userloading: false
        }
        case GET_PRODUCTS:
        return {
            ...state,
            getproducts: action.payload,
            userloading: false
        }
        case ORDER_INFORMATION:
        return {
            ...state,
            orderInformation: action.payload,
            userloading: false
        }
        case REPORT_LOADING:
        return {
          ...state,
          reportloading: true
        };
        case REPORT_STOPLOADING:
        return {
          ...state,
          reportloading: false
        };
        case LIST_REPORT:
        return {
            ...state,
            listreport: action.payload,
            reportloading: false
        }
        default:
            return state;
    }
}