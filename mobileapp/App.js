import React from 'react'
import {Dimensions,AsyncStorage,NativeModules,BackHandler,ToastAndroid,Text} from 'react-native'
Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;
import { createDrawerNavigator, createStackNavigator } from "react-navigation"
import DrawerContent from '@Component/Menu/Left'

import {Provider} from 'react-redux';
import store from './app/store';
import jwt_decode from 'jwt-decode';
import setAuthToken from './app/utils/setAuthToken';
import {setCurrentUser} from './app/actions/authAction';
import { fromLeft } from 'react-navigation-transitions';
const deviceWidth = Dimensions.get("window").width;
import {logoutUser} from "@Action/authAction";
//AsyncStorage.clear();
/* Route */

import SplashScreen from '@Screen/SplashScreen';
//LoginScreen
import LoginScreen from '@Screen/LoginScreen';
//Otp Screen
import OtpScreen from '@Screen/OtpScreen';
//HomeScreen
import HomeScreen from '@Screen/HomeScreen';
//RegisterScreen
import RegisterScreen from '@Screen/RegisterScreen';
//AddressScreen
import AddressScreen from '@Screen/AddressScreen';
//TravelPass
import TravelPass from '@Screen/TravelPass';
//ViewTravelPass
import ViewTravelPass from '@Screen/ViewTravelPass';
//EditUserProfile
import EditUserProfile from '@Screen/EditUserProfile';
//ViewQrcodeScreen
import ViewQrcodeScreen from '@Screen/ViewQrcodeScreen';
//Createsurvey
import CreateSurvey from '@Screen/CreateSurvey';
//QuestionList
import QuestionList from '@Screen/QuestionList';
//HealthList
import HealthList from '@Screen/HealthList';



//Check for Token
AsyncStorage.getItem('jwtToken').then((token) => {
  console.log("async",token)
  if(token !== null){
  setAuthToken(token);
  //Decode Token and get user info and exp
  const decoded = jwt_decode(token);
  //Set User and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  const currentTime = Date.now() / 1000;
    if(decoded.exp < currentTime){
      //Logout user
      store.dispatch(logoutUser());
      //this.props.history.push('login');
    }
  }
});




const AppNav = createStackNavigator(
  {
      SplashScreen:{
        screen:SplashScreen
      }, 
      LoginScreen:{
        screen:LoginScreen
      },  
      OtpScreen:{
        screen:OtpScreen
      }, 
      HomeScreen:{
        screen:HomeScreen
      }, 
      RegisterScreen:{
        screen:RegisterScreen
      }, 
      AddressScreen:{
        screen:AddressScreen
      }, 
      TravelPass:{
        screen:TravelPass
      }, 
      ViewTravelPass:{
        screen:ViewTravelPass
      },
      EditUserProfile:{
        screen:EditUserProfile
      },
      ViewQrcodeScreen:{
        screen:ViewQrcodeScreen
      },
      CreateSurvey:{
        screen:CreateSurvey
      },
      QuestionList:{
        screen:QuestionList
      },
      HealthList:{
        screen:HealthList
      },
  },
  {
    headerMode: "none",
    initialRouteName: "SplashScreen",
    transitionConfig: () => fromLeft(1000),
  }
)

const Drawer = createDrawerNavigator(
  {
    stack: {
      screen: AppNav,
    },
  },
  {
    contentComponent: DrawerContent,
    contentOptions: {
      activeTintColor: "#e91e63"
    },
    headerMode: "none",
    initialRouteName: "stack",
    
  }
)

export default class App extends React.Component {
  
  render() {
    return (
      <Provider store={store}>
      
        <Drawer />
      </Provider>
    );
  }
}