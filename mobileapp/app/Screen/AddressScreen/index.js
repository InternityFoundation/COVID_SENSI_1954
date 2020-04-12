import React, { Component } from "react";
import {
  Alert,
  View,
  PermissionsAndroid,
  Image,
  StatusBar,
  Platform,
  TouchableOpacity,
  BackHandler,
  ListView,
  ImageBackground,
  ScrollView,
  Picker,
  I18nManager,
  AsyncStorage,
  DatePickerAndroid,
  ActivityIndicator,
} from "react-native";
import {
  Root,
  Toast,
  Container,
  Button,
  Right,
  Left,
  Item,
  ListItem,
  Content,
  Body,
  Header,
  Text,
  Input,
  Radio
} from "native-base";
// Screen Styles
import styles from "./styles";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { TextField } from 'react-native-materialui-textfield';
import { Dropdown } from 'react-native-material-dropdown';
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
//import Dropdown from "@Component/Dropdown/dropdown/";
import { Fonts, Metrics, Colors, Images } from "@Component/Themes";
//action declareation
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import axios from 'axios';
import {loginUser} from '@Action/authAction';
import {getProducts,registerUser} from '../../actions/authAction';
import {API_URL,IMAGE_URL,pincode,onlyletters,onlynumbers,numberwithdot,
  letterswithdot,floatnumbers,
  mobilenumber,email,url} from "@Action/constant";
import RadioGroup from 'react-native-radio-buttons-group';
import Geolocation from 'react-native-geolocation-service';
import {listLocation} from '../../actions/locationAction';
class AddressScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address:"",
      stateName:'',
      city:'',
      area:'',
      locationID:'',
      familyMember:'',
      latitude:0,
      longitude:0,
      isloading:false,
      errors:{},
    };
   
  } 
  
	componentWillMount() {
    var that = this;	
		BackHandler.addEventListener('hardwareBackPress', function() {
      that.props.navigation.push('LoginScreen')
      return true;
    });
    

  }
  componentWillReceiveProps(nextProps){
    if(nextProps.auth.isAuthenticated){
      AsyncStorage.setItem('otp','yes')
      this.props.navigation.push('HomeScreen')
    }
    if(this.props.errors !== nextProps.errors){
      
      // Toast.show({
      // 	text: nextProps.errors.error.mobileNumber,
      // 	buttonText: "Okay",
      // 	duration: 3000,
      // 	onClose:this.clearerror()
      // }) 
      Alert.alert('', nextProps.errors.mobile,
      [
      {text: 'OK', onPress: ()=>this.clearerror()},
      ],
      {cancelable: false},
      );
    }
    this.setState({errors:nextProps.errors});
    }
  clearerror(){
  this.setState({errors:{}})
  }
componentDidMount(){
  this.getLocation();
  this.props.listLocation();
}

async getLocation(){
  const permission = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
  );
  const granted = await PermissionsAndroid.check( PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION );
      if (granted) {
        Geolocation.getCurrentPosition(
          position => {
            const location =position;
            this.setState({
              latitude:location.coords.latitude,
              longitude:location.coords.longitude
            })
      })
    }
}

async captureLocation(){
  Alert.alert(
    'Geolocation Capturing', 'Are you currently in your Delivery Address',
    [
      { text: 'No', onPress:() => {
        this.setState({showgeobtn:true,showbtn:false})
       }},
        { text: 'Yes', onPress:() => {
            this.getLocation()
        }},
        
    ],
  );
}

onSubmit(){
  this.setState({
    isloading:true
  })
  const { navigation } = this.props;
 var userdata= navigation.getParam('registerData', 'NO-DATA')
  const data={
      "name":userdata.name,
      "gender":userdata.gender,
      "mobile":userdata.mobileNumber,
      "aadhaarNO":userdata.aadhaarNO,
      "dob":userdata.dob,
      "panNO":userdata.panNO,
      "rationCardNO":userdata.rationCardNO,
      "familyMember":userdata.familyMember,
      "state":this.state.stateName,
      "city":this.state.city,
      "locationID":this.state.locationID,
      "lat":this.state.lat,
      "lng":this.state.lng, 
      "address":this.state.address    
  }
  
  
if(this.state.stateName !='' && this.state.city !='' && this.state.area !=''){
   this.props.registerUser(data);
 }else{
  this.setState({
    isloading:false
  })
    Alert.alert('','Fill All the Fields');
 }
}


  render() {
   const {errors}=this.state;

    StatusBar.setBarStyle("light-content", true);
    if (Platform.OS === "android") {
      StatusBar.setBackgroundColor("#273167", true);
      StatusBar.setTranslucent(true);
    }



const{listlocation,locationloading}=this.props.location;
  var stateList=[],cityList=[],areaList=[]
  if(listlocation==null || locationloading){
    stateList=cityList=areaList=[]
  }else{
      if(Object.keys(listlocation).length >0){

        listlocation.sort(function(a, b) {
          if(a.state.toLowerCase() < b.state.toLowerCase()) return -1;
          if(a.state.toLowerCase() > b.state.toLowerCase()) return 1;
          return 0;
         }).map(res=>{
           const exists=stateList.find(x=> x.value ===res.state)
           !exists && stateList.push({value:res.state})
         })
         if(this.state.stateName !==""){
                  listlocation.sort(function(a, b) {
                    if(a.city.toLowerCase() < b.state.toLowerCase()) return -1;
                    if(a.city.toLowerCase() > b.state.toLowerCase()) return 1;
                    return 0;
                  }).map(res=>{
                  if(this.state.stateName===res.state){
                    const exists=cityList.find(x=> x.value ===res.city)
                    !exists && cityList.push({value:res.city})
                   }
                })
                
          }
        
         if(this.state.stateName !="" && this.state.city !=""){
          listlocation.sort(function(a, b) {
            if(a.city.toLowerCase() < b.state.toLowerCase()) return -1;
            if(a.city.toLowerCase() > b.state.toLowerCase()) return 1;
            return 0;
           }).map(res=>{
            if(this.state.stateName===res.state && this.state.city===res.city){
             const exists=areaList.find(x=> x ===res.areaName)
             !exists && areaList.push({value:res.areaName,id:res._id})
           }
          })
         }
      }else{
        stateList=cityList=areaList=[]
      }
  }
console.log("area list",areaList);
  
    return (
      <Root>
      <Container style={styles.main}>
        <Header androidStatusBarColor={"#273167"} style={styles.header}>
          <Left style={styles.left}>
          <TouchableOpacity
              style={styles.backArrow}
              onPress={()=>this.props.navigation.push('RegisterScreen')}
            >
              <FontAwesome
                name={I18nManager.isRTL ? "arrow-right" : "arrow-left"}
                size={25}
                color="white"
                style={{ paddingRight: 20 }}
              />
            </TouchableOpacity>
          </Left>
          <Body style={styles.body}>
            <Text style={styles.textTitle}>Address Details</Text>
          </Body>
          <Right style={styles.right}>
          
          <View style={{ flexDirection: 'row' }}>
                  
						</View>
          </Right>
        </Header>

        <Content>
          <View style={{marginHorizontal:30,marginTop:20}}>
             
             <TextField
                  label='Address'
                  value={this.state.address}
                  returnKeyType = { "next" }
                  onSubmitEditing={() => { this.secondTextInput.focus(); }}
                  blurOnSubmit={false}
                  onChangeText={ (address) =>{
                    this.setState({ address })
                  }}                  
             />
              <Dropdown
                  data={stateList}
                  label='State *'
                  value={this.state.stateName}
                  onChangeText={ (stateName) => this.setState({ stateName }) }
                />
                 <Dropdown
                  data={cityList}
                  label='City *'
                  value={this.state.city}
                  onChangeText={ (city) => this.setState({ city }) }
                />
                 <Dropdown
                  data={areaList}
                  label='Area *'
                  value={this.state.area}
                  onChangeText={ (area) =>{
                    const exists=areaList.find(x=> x.value ===area)
                   exists && this.setState({locationID:exists.id,area:area},()=>console.log("loc",this.state.locationID))
                    
                  }}
                />
          </View>
         
        </Content>

        <View style={styles.divider} />

        <View style={styles.bottomView}>
        {this.state.isloading ? <TouchableOpacity
            style={styles.footerBtnBg}
          >
            <ActivityIndicator size="small" color="#ffffff" />
          </TouchableOpacity>:  <TouchableOpacity
            style={styles.footerBtnBg}
           onPress={()=>this.onSubmit()}
          >
            <Text style={styles.footerBtnTxt}>Submit</Text>
        </TouchableOpacity> }
        </View>
      </Container>
      </Root>
    );
  }
}
AddressScreen.propTypes = {
  auth:PropTypes.object.isRequired,
  listLocation: PropTypes.func.isRequired,
  registerUser: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
	auth: state.auth,
  errors: state.errors,
  user:state.user,
  location:state.location
});


export default connect(mapStateToProps,{listLocation,registerUser})(AddressScreen)