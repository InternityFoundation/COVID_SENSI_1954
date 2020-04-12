import React, {Component } from 'react';
import {ActivityIndicator,AsyncStorage,Alert,Text, View,Image, TextInput, TouchableOpacity, ImageBackground, Platform ,StatusBar, BackHandler,I18nManager } from 'react-native';
import { Root,Toast,Container, Button, Icon, Right, Item, Input, Header, Left, Body, Title} from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
// Screen Styles
import styles from './styles';
import Style from '@Theme/Style';
//action declareation
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import axios from 'axios';
import {loginUser} from '@Action/authAction';
import {API_URL} from "@Action/constant";
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import OtpInputs from "react-native-otp-inputs";

class OtpScreen extends Component{
	constructor(){
		super();
		this.state={
		 errors:{},
		 otp:'',
		 password:'',
		 isLoading: false,
		 
		}
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		
	
}

async  componentDidMount(){

	
}


onChange(name,value){
	this.setState({[name]:value})
}

onSubmit(){
	this.setState({
		isLoading:true
	})
if(this.state.otp ===''){
	// Toast.show({
	// 	text: "Enter OTP",
	// 	//buttonText: "OK",
	// 	duration: 3000,
	// 	onClose:this.clearerror()
	// }) 
	Alert.alert('', 'Enter OTP',
	[
	  {text: 'OK', onPress: ()=>this.clearerror()},
	],
	{cancelable: false},
  );
	this.setState({
		isLoading:true
	})
	return null
}

const data={
	otp:this.state.otp
}
axios.post(API_URL+'/api/user/verifyOtp',data)
.then(res=>{
	AsyncStorage.setItem('otp','yes')
	this.props.navigation.push('HomeScreen')
})
.catch(err=>{
console.log("err",err);
	this.setState({isLoading:false})
	Toast.show({
		text: "Enter Valid OTP",
		buttonText: "OK",
		duration: 3000,
		onClose:this.clearerror()
	 }) 
	//  AsyncStorage.setItem('otp','yes')
	//  this.props.navigation.push('HomeScreen')
	// Alert.alert('', 'Enter Valid OTP',
	// [
	// 	{text: 'OK', onPress: ()=>this.clearerror()},
	// ],
	// {cancelable: false},
	// );
})


}
componentWillReceiveProps(nextProps){

}

clearerror(){
this.setState({errors:{}})
}
onResend(){
	const {user}=this.props.auth;
	console.log("data",user)
	const data={
		mobile:user.mobile
	  }
	  axios.post(API_URL+'/api/user/resendOtp',data)
	  .then(res=>{
		console.log("res",res.data);
		  Toast.show({
			text: "OTP Sent Successfully",
			//buttonText: "OK",
			duration: 2000,
			onClose:()=> this.setState({sendOTP:true})
		  }) 
	  })
	  .catch(err=>{
		  Toast.show({
			text: "Error Occured Try Again",
			type:"danger",
			//buttonText: "OK",
			duration: 3000,
		  }) 
	  })
}
componentWillMount() {
    var that = this;
		
		BackHandler.addEventListener('hardwareBackPress', function() {
			Alert.alert(
					'Exit App',
					'Exiting the application?', [{
							text: 'Cancel',
							onPress: () => console.log('Cancel Pressed'),
							style: 'cancel'
					}, {
							text: 'OK',
							onPress: () => BackHandler.exitApp()
					}, ], {
							cancelable: false
					}
				)
				return true;
		});
}

	render() {
		StatusBar.setBarStyle('light-content', true);
    if(Platform.OS === 'android') {
			StatusBar.setBackgroundColor('#1f86b5',true);
			StatusBar.setTranslucent(true);
   	}
		var temp = [
        {
        "path": "Android",
        "name": "Android",
        "checked": true
      },
    ]
    var leftText = temp.name;

    const imageUri = "http://www.aranpaal.com/images/bg.png";
    let logo13 = { uri: 'https://antiqueruby.aliansoftware.net/Images/signin/ic_logo_mountifysthirteen.png' };
	const backgroundcolor=this.state.otp ==''  ? 'rgb(229, 229, 229)' : '#273167';
	const textcolor=this.state.otp =='' ? '#9D9FA2' : '#ffffff';
	console.log("otp",this.state.otp)
	return (
			<Root>
			<Container style={Style.bgPureGrey}>
		
					<Header style={styles.header}>
					
						<Body style={styles.body}>
							<Text style={styles.textTitle}></Text>
						</Body>
						<Right style={styles.right}/>
					</Header>
					<View style={{marginHorizontal:5,justifyContent:'center',marginBottom:30,height:hp('70%')}} >
					<Text autoCapitalize="words" style={[styles.loginText,{fontSize:20}]}>Enter Code.</Text>
						<Text autoCapitalize="words" style={styles.loginText}>We have sent a sms on registered mobile with 4 digit verification code.</Text>
						<View style={{backgroundColor:'#ffffff',marginHorizontal:5,elevation:10,borderRadius:10,paddingVertical:10}}>
						<View style={styles.inputFieldSec}>
							{/* <Item style={styles.itememail}>
							<Input 
								onChangeText={(otp)=> this.setState({otp})}
								placeholderTextColor='#000000'
								textAlign={'center'}
								value={this.state.otp}
								placeholder='Enter OTP'
								keyboardType="number-pad"
								maxLength={4}
								style={styles.inputemail} />
							</Item>             */}
						  <OtpInputs
							handleChange={otp =>this.setState({otp})}
							numberOfInputs={4}
							
							/>
						</View>
						{ !this.state.isLoading ? <TouchableOpacity
							disabled={this.state.otp ==''  ? true : false}
							//activeOpacity={this.state.employeeID !='' || this.state.password !='' ? 1 : 0.2}
							style={[styles.buttondialogsignup,{backgroundColor:backgroundcolor}]}
							onPress={()=>this.onSubmit()}
							//onPress={()=>this.props.navigation.push('KycProfile')}
						>
							<Text autoCapitalize="words" style={[styles.buttonsignin,{color:textcolor}]}>
										Verify OTP
							</Text>
						</TouchableOpacity> : <TouchableOpacity
							disabled={this.state.otp ==''  ? true : false}
							//activeOpacity={this.state.employeeID !='' || this.state.password !='' ? 1 : 0.2}
							style={[styles.buttondialogsignup,{backgroundColor:backgroundcolor}]}
						>
							<View  style={[styles.buttonsignin,{color:textcolor}]}><ActivityIndicator size="small" color="#ffffff" /></View>
						</TouchableOpacity> }
						<TouchableOpacity><Text style={{paddingVertical:10,textAlign:'center',fontSize:12,color:'#000000'}}> Did not receive the code ?  </Text></TouchableOpacity>
						<View style={{flexDirection:'row',justifyContent:'space-evenly',alignItems:'center',paddingVertical:15}}>
						<Text onPress={() => this.onResend()} style={{fontSize:12,color:'#00a0e3'}}>Resend</Text>
						{/* <Text onPress={() => this.onResend()} style={{fontSize:12,color:'#00a0e3'}}>Call</Text> */}
						</View>
					</View>
				</View>
					<View style={styles.signInSec}> 
					
						
						</View>
			</Container>
			</Root>
		);
	}
}
OtpScreen.propTypes = {
	auth:PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
	auth: state.auth,
	errors: state.errors
});


export default connect(mapStateToProps,{})(OtpScreen)
