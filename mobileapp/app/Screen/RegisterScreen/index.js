import React, { Component } from "react";
import {
  View,
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
  Alert
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
import {API_URL,IMAGE_URL,pincode,onlyletters,onlynumbers,numberwithdot,
  letterswithdot,floatnumbers,
  mobilenumber,email} from "@Action/constant";
import RadioGroup from 'react-native-radio-buttons-group';
class RegisterScreen extends Component {
  constructor(props) {
    super(props);



    this.state = {
      name:'',
      mobileNumber:'',
      gender:'male',
      aadhaarNO:'',
      dob:'',
      panNO:'',
      rationCardNO:'',
      familyMember:"",
      sendOTP:false,
      verifyOTP:false,
      otpNo:'',    
      errors:{},
      data: [
        {
            label: 'Male',
            value: "male",
        },
        {
          label: 'Female',
          value: "female",
      },
      ],     
    };
   
  } 
  onPress = data =>{
    this.setState({ data }
      ,()=>{
        const selectvalue=this.state.data.find(x=> x.selected === true)
        this.setState({gender:selectvalue.value})
        console.log("selectedvalue",selectvalue.value)
      });
    
    

  } 


	componentWillMount() {
    var that = this;
		
		BackHandler.addEventListener('hardwareBackPress', function() {
      that.props.navigation.push('LoginScreen')
      return true;
		});
	}
componentDidMount(){

}

async onSelectDate(name){
   try {
     var {action, year, month, day} = await DatePickerAndroid.open({
       // Use `new Date()` for current date.
       // May 25 2020. Month 0 is January.
       date: new Date(),
       maxDate: new Date(),
     });
     if (action !== DatePickerAndroid.dismissedAction) {
       var date=''
       let tempmonth=month+1;
       if (tempmonth < 9) month = '0' + (month+1);
       else  month = tempmonth;
       if (day < 9) day = '0' + day;  
         date =year+'-'+month+'-'+day;
          this.setState({
            [name]:date
          })
     }
   } catch ({code, message}) {
     console.warn('Cannot open date picker', message);
   }
 }

onSubmit(){
   const data={
    name:this.state.name,
    mobileNumber:this.state.mobileNumber,
    gender:this.state.gender,
    aadhaarNO:this.state.aadhaarNO,
    panNO:this.state.panNO,
    rationCardNO:this.state.rationCardNO,
    familyMember:this.state.familyMember
  }
  if(Object.keys(this.state.errors).length ===0 && data.name !='' && data.mobileNumber !='' && data.gender !='' &&  data.dob !='' && data.aadhaarNO !=''){
      this.props.navigation.push('AddressScreen',{
        registerData:data
      })
  }else{
    // Toast.show({
    //   text: "Fill All the Fields",
    //  // buttonText: "OK",
    //   duration: 3000,
    // }) 
    Alert.alert('','Fill All the Fields');
  }
  
}

sendOTP(){
  //this.setState({sendOTP:true})
  const data={
    mobileNumber:this.state.mobileNumber
  }
  axios.post(API_URL+'/api/user/newUserSendOtp',data)
  .then(res=>{
    console.log("res",res.data);
      // Toast.show({
      //   text: "OTP Sent Successfully",
      //   //buttonText: "OK",
      //   duration: 2000,
      //   onClose:()=> this.setState({sendOTP:true})
      // })
      Alert.alert('', 'OTP Sent Successfully',
      [
        {text: 'OK', onPress: ()=> this.setState({sendOTP:true})},
      ],
      {cancelable: false},
    );
  })
  .catch(err=>{
    console.log("err",err)
    var errorData= err.response.data;
      // Toast.show({
      //   text: errorData.error.error,
      //   type:"danger",
      //   //buttonText: "OK",
      //   duration: 3000,
      // }) 
      Alert.alert('',errorData.error.error);
  })
 
}
verifyOTP(){
  const data={
    mobileNumber:this.state.mobileNumber,
    otp:this.state.otpNo
  }
  if(this.state.otpNo === ''){
    // Toast.show({
    //   text: "Enter OTP Number",
    //   //buttonText: "OK",
    //   duration: 2000,
      
    // }) 
    Alert.alert('','Enter OTP Number');
    return null
  }
  axios.post(API_URL+'/api/user/newUserVerifyOtp',data)
  .then(res=>{
      // Toast.show({
      //   text: "OTP Verified Successfully",
      //  // buttonText: "OK",
      //   duration: 2000,
      //   onClose:()=>  this.setState({verifyOTP:true})
      // }) 
      Alert.alert('', 'OTP Verified Successfully',
      [
        {text: 'OK', onPress: ()=>  this.setState({verifyOTP:true})},
      ],
      {cancelable: false},
    );
  })
  .catch(err=>{
    console.log("err",err)
      // Toast.show({
      //   text: "OTP Incorrect please check",
      //  // buttonText: "OK",
      //   duration: 3000,
      // }) 
      Alert.alert('','OTP Incorrect please check');
  })
}
  render() {
   const {errors}=this.state;
    StatusBar.setBarStyle("light-content", true);
    if (Platform.OS === "android") {
      StatusBar.setBackgroundColor("#273167", true);
      StatusBar.setTranslucent(true);
    }
console.log("tis.state",this.state.martialStatus)
const pageName=this.props.navigation.getParam('pageName', 'HomeScreen');
    return (
      <Root>
      <Container style={styles.main}>
        <Header androidStatusBarColor={"#273167"} style={styles.header}>
          <Left style={styles.left}>
          <TouchableOpacity
              style={styles.backArrow}
              onPress={()=>this.props.navigation.push('LoginScreen')}
            >
              <FontAwesome
                name={I18nManager.isRTL ? "arrow-right" : "arrow-left"}
                size={25}
                color="white"
                style={{ paddingRight: 20 }}
              />
            </TouchableOpacity>
          </Left>
          <Body style={styles.body}/>
          <Right style={styles.right}>
          
          <View style={{ flexDirection: 'row' }}>
                  
						</View>
          </Right>
        </Header>

        <Content>
          <View style={{marginHorizontal:30,marginTop:20}}>
             <TextField
                  label='Enter Your Name *'
                  returnKeyType = { "next" }
                  onSubmitEditing={() => { this.secondTextInput.focus(); }}
                  blurOnSubmit={false}
                  value={this.state.name}
                  editable={!this.state.verifyOTP}
                   onChangeText={ (name) => {
                    const validate=onlyletters.test(name);
                    if(!validate &&name !=''){
                      errors['name']="Enter a Valid Name";
                      this.setState({errors})
                    }else{
                      delete errors['name']
                    }
                    this.setState({ name }) }}
                    error={errors.name}
                />
                <View style={{flexDirection:'row'}}>
                  <View style={{width:!this.state.verifyOTP && this.state.name && this.state.mobileNumber.length === 10 ? '70%' : '100%'}}>
                      <TextField
                          ref={(input) => { this.secondTextInput = input; }}
                          keyboardType='number-pad'
                          label='Enter Mobile Number *'
                          editable={!this.state.verifyOTP}
                          value={this.state.mobileNumber}
                          onChangeText={ (mobileNumber) => {
                            const validate=mobilenumber.test(mobileNumber);
                            if(!validate &&mobileNumber !=''){
                              errors['mobileNumber']="Enter a Valid Mobile Number";
                              this.setState({errors})
                            }else{
                              delete errors['mobileNumber']
                            }
                            this.setState({ mobileNumber }) }}
                            error={errors.mobileNumber}
                        />
                  </View>
                  {!this.state.verifyOTP && this.state.name !='' && this.state.mobileNumber.length === 10 ?  <View style={{width:'30%',paddingTop:20}}>
                      <Button rounded info onPress={()=>this.sendOTP()} >
                          <Text style={{alignSelf:'center',color:'white',textAlign:'center',fontSize:15}} >Get OTP</Text>
                      </Button>
                  </View> : null }
              </View>
              {/* OTP DISPLAY */}
          {this.state.sendOTP && !this.state.verifyOTP ?  <View style={styles.otpDisplay}>
                  <Text style={{fontSize:12}}>Please enter your OTP</Text>
                  <View style={{width:'50%',marginVertical:10}}>
                    <Item regular>
                      <Input
                      placeholder='Enter OTP'
                      style={{textAlign:'center'}}
                      keyboardType='number-pad'
                      onChangeText={ (otpNo) => this.setState({ otpNo }) }
                      />
                    </Item>
                  </View>
                  <Button rounded info  onPress={()=>this.verifyOTP()}>
                          <Text style={{alignSelf:'center',color:'white',textAlign:'center',fontSize:15 ,paddingHorizontal:20,}}>Verify</Text>
                      </Button>
                  <TouchableOpacity onPress={()=>this.sendOTP()}><Text style={{alignSelf:'center',color:'blue',textAlign:'center',fontSize:14 ,paddingHorizontal:20,paddingTop:10}}>Resend</Text></TouchableOpacity>
              </View> : null }
             {this.state.verifyOTP ? <View style={{marginTop:20}}>
               <View style={{justifyContent:'space-between',flexDirection:'row'}}>
                  <Text style={{color:'grey'}}>Gender</Text>
                  {/* <View style={{flexDirection:'row'}}>
                   <Radio selected={true} />
                   <Text>Male</Text>
                  </View>
                  <View style={{flexDirection:'row'}}>
                   <Radio selected={true} />
                   <Text>Male</Text>
                  </View> */}
                  <RadioGroup 
                    radioButtons={this.state.data} 
                    onPress={this.onPress} 
                    flexDirection='row'
                />
               </View>
               <View>
                    <TouchableOpacity onPress={()=>this.onSelectDate('dob')} >             
                      <Text style={{color:'rgb(150,150,150)',fontSize:12,marginTop:15}}>{this.state.dob!='' ? 'DOB' :null}</Text> 
                  <View style={[{borderBottomWidth:2,marginTop:5,borderBottomColor:'rgb(229, 229, 229)'}]}>    
                      <Text style={{color:'rgb(150,150,150)',fontSize:16}}>{this.state.dob ==='' ? 'DOB' :this.state.dob}</Text>
                  </View>  
                    </TouchableOpacity>
                </View>
               <TextField
                  label='Aadhaar No'
                  value={this.state.aadhaarNO}
                  onChangeText={ (aadhaarNO) => {
                    this.setState({ aadhaarNO }) }}
                    error={errors.aadhaarNO}
              />

             <TextField
                  label='PAN No (Optional)'
                  value={this.state.panNO}
                  onChangeText={ (panNO) => {
                    this.setState({panNO}) }}
                    error={errors.panNO}
              />
               <TextField
                  label='Ration Card No (Optional)'
                  value={this.state.rationCardNO}
                  onChangeText={ (rationCardNO) => {
                    this.setState({rationCardNO}) }}
                    error={errors.rationCardNO}
              />
                <TextField
                  label='Total Family Member'
                  value={this.state.familyMember}
                  onChangeText={ (familyMember) => {
                    this.setState({ familyMember }) }}
                    error={errors.familyMember}
              />
                    
              </View> : null}
          </View>
        </Content>

        <View style={styles.divider} />

        <View style={styles.bottomView}>
        {this.state.verifyOTP ?  <TouchableOpacity
            style={styles.footerBtnBg}
           onPress={()=>this.onSubmit()}
          >
            <Text style={styles.footerBtnTxt}>Next</Text>
          </TouchableOpacity> : null}
        </View>
      </Container>
      </Root>
    );
  }
}
RegisterScreen.propTypes = {
	auth:PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
	auth: state.auth,
  errors: state.errors,
  user:state.user
});


export default connect(mapStateToProps,{})(RegisterScreen)