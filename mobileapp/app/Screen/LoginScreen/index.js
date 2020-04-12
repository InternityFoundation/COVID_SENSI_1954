import React, { Component } from 'react';
import {Alert,ActivityIndicator,Text, View, Image, TextInput, TouchableOpacity, ImageBackground, Platform ,StatusBar, BackHandler,I18nManager } from 'react-native';
import {Root,Toast,Container, Button, Icon, Right, Item, Input, Header, Left, Body, Title, Footer} from 'native-base';
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

class LoginScreen extends Component {
	constructor(){
		super();
		this.state={
		 errors:{},
		 mobile:'',
		 password:'',
		 isLoading: true,
		 
		}
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);	
}
async  componentDidMount(){
	if(this.props.auth.isAuthenticated){
			this.props.navigation.push('HomeScreen')
	}  
}


onChange(name,value){
	this.setState({[name]:value})
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
onSubmit(){
this.setState({errors:{}},()=>{
	const data={
		mobile:this.state.mobile,
	}
	this.props.loginUser(data);
})

}
componentWillReceiveProps(nextProps){
	if(nextProps.auth.isAuthenticated){
		this.props.navigation.push('OtpScreen')
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

// componentWillUnmount() {
// // This is the Last method in the activity lifecycle
// // Removing Event Listener for the BackPress 
// BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
// }

// handleBackButtonClick() {
// // Registered function to handle the Back Press
// // To popup the default screen while going back you can use goBack
// Alert.alert(
// 	'Exit App',
// 	'Exiting the application?', [{
// 			text: 'Cancel',
// 			onPress: () => console.log('Cancel Pressed'),
// 			style: 'cancel'
// 	}, {
// 			text: 'OK',
// 			onPress: () => BackHandler.exitApp()
// 	}, ], {
// 			cancelable: false
// 	}
// )
// return true;
// // To exit from your App you can use BackHandler.exitApp();. 
// // Just comment the above line and uncomment the below to use it 
// //BackHandler.exitApp();
// // Returning true means we have handled the backpress
// // Returning false means we haven't handled the backpress
// // Try to make it false also
// return true;
// }

render() {
		StatusBar.setBarStyle('light-content', true);
    if(Platform.OS === 'android') {
			StatusBar.setBackgroundColor("#1f86b5",true);
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
   const {errors}=this.state;
        const {user,loading} = this.props.auth;
        console.log("data",loading)
        const backgroundcolor=this.state.mobile =='' || this.state.mobile.length !==10 ? 'rgb(229, 229, 229)' : '#273167';
        const textcolor=this.state.mobile =='' || this.state.mobile.length !==10? '#9D9FA2' : '#ffffff';
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
						<Text autoCapitalize="words" style={styles.loginText}>Enter your mobile number we will send you the OTP to verify later.</Text>
						<View style={{backgroundColor:'#ffffff',marginHorizontal:5,elevation:10,paddingVertical:30}}>
						<View style={styles.inputFieldSec}>
						  <Item regular  style={styles.itemcode}>
												<Input 
														placeholderTextColor='#000000'
														textAlign={'center'} 
														placeholder='+91'
														value='+91'
														keyboardType="number-pad"
														maxLength={10} 
														disabled={true}
														style={styles.inputemail}
														onChangeText={(value)=>this.onChange('mobile',value)}
												/>
							</Item> 
							<Item regular success style={styles.itememail}>
												<Input 
														placeholderTextColor='#000000'
														textAlign={I18nManager.isRTL ? 'right' : 'left'} 
														placeholder='Enter 10 digit Mobile No'
														value={this.state.mobile}
														keyboardType="number-pad"
														maxLength={10} 
														style={styles.inputemail}
														onChangeText={(value)=>this.onChange('mobile',value)}
												/>
											{this.state.mobile =='' || this.state.mobile.length !==10? null :<Icon name='checkmark-circle' />}
							</Item>            
						</View>
						{ !loading ? <TouchableOpacity
							disabled={this.state.mobile =='' || this.state.mobile.length !== 10 ? true : false}
							//activeOpacity={this.state.employeeID !='' || this.state.password !='' ? 1 : 0.2}
							style={[styles.buttondialogsignup,{backgroundColor:backgroundcolor}]}
						 onPress={()=>this.onSubmit()}
						//onPress={()=>this.props.navigation.push('OtpScreen')}
						>
							<Text autoCapitalize="words" style={[styles.buttonsignin,{color:textcolor}]}>
										Submit
							</Text>
						</TouchableOpacity> : <TouchableOpacity
							disabled={this.state.mobile =='' || this.state.mobile.length !== 10 ? true : false}
							//activeOpacity={this.state.employeeID !='' || this.state.password !='' ? 1 : 0.2}
							style={[styles.buttondialogsignup,{backgroundColor:backgroundcolor}]}
						>
							<View  style={[styles.buttonsignin,{color:textcolor}]}><ActivityIndicator size="small" color="#ffffff" /></View>
						</TouchableOpacity> }
						<TouchableOpacity><Text style={{paddingVertical:10,textAlign:'center',fontSize:16,color:'#000000'}}>Dont have an account?  <Text onPress={() => this.props.navigation.push('RegisterScreen')} style={{textDecorationLine:'underline',fontSize:16,color:'#00a0e3'}}>Sign Up</Text></Text></TouchableOpacity>          
					</View>
				</View>
					<View style={styles.signInSec}> 
					
						
						</View>
			</Container>
			</Root>
		);
	}
}
LoginScreen.propTypes = {
	loginUser: PropTypes.func.isRequired,
	auth:PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
	auth: state.auth,
	errors: state.errors
});


export default connect(mapStateToProps,{loginUser})(LoginScreen)
