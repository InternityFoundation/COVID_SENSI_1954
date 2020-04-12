import React, { Component } from 'react';
import {
	Text,
	View,
	Image,
	StatusBar,
	TouchableOpacity,
	Platform,
	BackHandler,
	I18nManager,
	AsyncStorage,
	ActivityIndicator,
	Alert,
	TimePickerAndroid,
	DatePickerAndroid
} from 'react-native';
import {
	Root,
	Toast,
	Content,
	Container,
	Right,
	Header,
	Left,
	Body,
	Title,
} from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import styles from './styles';
import { Images, Fonts, Metrics, Colors } from "@Component/Themes";
//action declareation
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {API_URL,IMAGE_URL,pincode,onlyletters,onlynumbers,numberwithdot,
	letterswithdot,floatnumbers,
	mobilenumber,email} from "@Action/constant";
import axios from 'axios';
import { TextField } from 'react-native-materialui-textfield';
import { Dropdown } from 'react-native-material-dropdown';
class UserProfile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isloading:false,
			result:[],
			errors:{},
			purpose:'',
			date:'',
			destination:'',
			timeAlotted:'',
			startTime:'',
			endTime:'',
			travelMode:'',
			vehicleNo:'',
			status:'Waiting For Approval'
		};
	}
	componentDidMount(){
		
	}

	onChangePasswordClick() {
		this.props.navigation.navigate('ECommerceChangePassword');
	}

	onBackClick() {
		const pageName=this.props.navigation.getParam('pageName', 'HomeScreen');
		this.props.navigation.push(pageName);
	}

	componentWillMount() {
		var that = this;
		const pageName=this.props.navigation.getParam('pageName', 'HomeScreen');
		
		BackHandler.addEventListener('hardwareBackPress', function() {
			that.props.navigation.push(pageName);
			return true;
		});
	}

	_handleBagNavigation() {
		AsyncStorage.multiSet([
			['ArrivedFrom',"ECommerceMyInformation"],
		]);
		this.props.navigation.navigate("ECommerceMyBag");
	}

	_handleWishListNavigation() {
		AsyncStorage.multiSet([
			['ArrivedForWishList',"ECommerceMyInformation"],
		]);
		this.props.navigation.navigate("ECommerceWishList");
	}
	onSubmit(){
		var tempNo=this.state.vehicleNo;
		if(this.state.travelMode ==='Other'){
			tempNo="No Number"
		}
		const data={
			purpose:this.state.purpose,
			date:this.state.date,
			destination:this.state.destination,
			timeAlotted:'-',
			startTime:this.state.startTime,
			endTime:this.state.endTime,
			travelMode:this.state.travelMode,
			vehicleNo:tempNo,
			status:this.state.status
		}
		if(Object.keys(this.state.errors).length ===0){
			axios.post(API_URL+'/api/passbooking/',data)
			.then(res=>{
				// Toast.show({
				// 	text: `Request Waiting For Approval`,
				// 	type: 'success',
				//    // buttonText: 'OK',
				// 	duration: 3000,	
				//   });
				  Alert.alert('', 'Request Waiting For Approval',
				[
					{text: 'OK', onPress: ()=>this.props.navigation.push('ViewTravelPass')},
				],
				{cancelable: false},
				);
			})
			.catch(err=>{
				this.setState({
					errors:err.response.data
				})
				console.log("err",err.response.data)
				Toast.show({
					text: `Error Occured Try again Later`,
					type: 'danger',
				   // buttonText: 'OK',
					duration: 3000,	
				  })
			})
		}else{
			Toast.show({
				text: `Please Check All the Fields`,
				type: 'danger',
			   // buttonText: 'OK',
				duration: 3000,
				
			  });
		}
	
	}

	async onSelectDate(name){
		try {
		  var {action, year, month, day} = await DatePickerAndroid.open({
			// Use `new Date()` for current date.
			// May 25 2020. Month 0 is January.
			date: new Date(),
			minDate: new Date(),
		  });
		  if (action !== DatePickerAndroid.dismissedAction) {
			var date=''
			let tempmonth=month+1;
			if (tempmonth < 9) month = '0' + (month+1);
			else  month = tempmonth;
			if (day < 9) day = '0' + day;  
			 // date =year+'-'+month+'-'+day;
			  date =day+'-'+month+'-'+year;
			   this.setState({
				 [name]:date
			   })
		  }
		} catch ({code, message}) {
		  console.warn('Cannot open date picker', message);
		}
	  }
	  async onSelectTime(name){
		try {
			const {action, hour, minute} = await TimePickerAndroid.open({
			  hour: 14,
			  minute: 0,
			  is24Hour: false, // Will display '2 PM'
			});
			if (action !== TimePickerAndroid.dismissedAction) {
				console.log("hour,minute",hour,minute)
				if(hour >12){
					var temphour=hour-12 
					var temptime=`${temphour}:${minute} PM`;
					console.log("temphour",temptime);
					this.setState({
						[name]:temptime
					  })
				}else{
					var temptime=`${hour}:${minute} AM`;
					console.log("temphour",temptime);
					this.setState({
						[name]:temptime
					  })
				}
			  // Selected hour (0-23), minute (0-59)
			}
		  } catch ({code, message}) {
			console.warn('Cannot open time picker', message);
		  }
	  }
	render() {
		StatusBar.setBarStyle('light-content', true);
		if (Platform.OS === 'android') {
			StatusBar.setBackgroundColor('#0e1130', true);
			StatusBar.setTranslucent(true);
		}
		const {errors}=this.state;
		const {user}=this.props.auth;
	

		return (
			<Root>
			<Container style={styles.container}>
				<Header androidStatusBarColor={'#0e1130'} style={[styles.header]}>
					<Left style={styles.left}>
						<TouchableOpacity
							style={styles.backArrow}
							onPress={this.onBackClick.bind(this)}>
							<FontAwesome
								name={I18nManager.isRTL ? 'angle-right' : 'angle-left'}
								size={30}
								color="#fff"
								style={{paddingRight: 20}}
							/>
						</TouchableOpacity>
					</Left>
					<Body style={styles.body}>
						{/* <Text style={styles.textTitle}>Edit Profile</Text> */}
					</Body>
					<Right style={styles.right}>
					</Right>
				</Header>
			<Content>
					<View style={{marginHorizontal:15}}>
						<Text style={{fontSize:28,color:'#000',paddingVertical:5,lineHeight:35,fontFamily:'JosefinSans-SemiBold',}}>Application Travel Pass/Self with in (Ps limit)</Text>
						<Text style={{fontSize:18,color:'#000',lineHeight:30}}>As per our guidelines,please provide following details  to get travel passes.</Text>
					</View>
					<View style={{marginHorizontal:30,marginTop:10,marginBottom:20}}>
						<TextField
							label='Purpose of Travel'
							value={this.state.purpose}
							onChangeText={ (purpose) =>{
								const validate=onlyletters.test(purpose);
								if(!validate &&purpose !=''){
								errors['purpose']="Enter a valid Purpose";
								this.setState({errors})
								}else{
								delete errors['purpose']
								}
								this.setState({ purpose }) }}
								error={errors.purpose}                
						/>
						<View>
							<TouchableOpacity onPress={()=>this.onSelectDate('date')} >             
							<Text style={{color:errors.date?'#FF0000':'rgb(150,150,150)',fontSize:12,marginTop:15,}}>{this.state.date!='' ? 'Date of Tavel' :null}</Text> 
							<View style={[{borderBottomWidth:2,marginTop:5,borderBottomColor:errors.date?'#FF0000':'rgb(229, 229, 229)'}]}>    
								<Text style={{color:'rgb(150,150,150)',fontSize:16}}>{this.state.date ==='' ? 'Date of Tavel' :this.state.date}</Text>
								
							</View>  
							{errors.date ? <Text style={{color:'#FF0000',fontSize:16}}>{errors.date}</Text> : null}
							</TouchableOpacity>
						</View>
						<TextField
							label='Destination'
							value={this.state.destination}
							onChangeText={ (destination) =>{
								const validate=onlyletters.test(destination);
								if(!validate &&destination !=''){
								errors['destination']="Enter a valid Destination";
								this.setState({errors})
								}else{
								delete errors['destination']
								}
								this.setState({ destination }) }}
								error={errors.destination}                
						/>
						{/* <TextField
							label='Time Allotted'
							value={this.state.timeAlotted}
							maxLength={2}
							onChangeText={ (timeAlotted) =>{
								const validate=onlynumbers.test(timeAlotted);
								if(!validate &&timeAlotted !=''){
								errors['timeAlotted']="Enter a valid Time Alloted";
								this.setState({errors})
								}else{
								delete errors['timeAlotted']
								}
								this.setState({ timeAlotted }) }}
								error={errors.timeAlotted}                
						/> */}
						<View>
							<TouchableOpacity onPress={()=>this.onSelectTime('startTime')} >             
							<Text style={{color:errors.startTime?'#FF0000':'rgb(150,150,150)',fontSize:12,marginTop:15,}}>{this.state.startTime!='' ? 'Start Time' :null}</Text> 
							<View style={[{borderBottomWidth:2,marginTop:5,borderBottomColor:errors.startTime?'#FF0000':'rgb(229, 229, 229)'}]}>    
								<Text style={{color:'rgb(150,150,150)',fontSize:16}}>{this.state.startTime ==='' ? 'Start Time' :this.state.startTime}</Text>
								
							</View>  
							{errors.startTime ? <Text style={{color:'#FF0000',fontSize:16}}>{errors.startTime}</Text> : null}
							</TouchableOpacity>
						</View>
						<View>
							<TouchableOpacity onPress={()=>this.onSelectTime('endTime')} >             
							<Text style={{color:errors.endTime?'#FF0000':'rgb(150,150,150)',fontSize:12,marginTop:15,}}>{this.state.endTime!='' ? 'End Time' :null}</Text> 
							<View style={[{borderBottomWidth:2,marginTop:5,borderBottomColor:errors.endTime?'#FF0000':'rgb(229, 229, 229)'}]}>    
								<Text style={{color:'rgb(150,150,150)',fontSize:16}}>{this.state.endTime ==='' ? 'End Time' :this.state.endTime}</Text>
								
							</View>  
							{errors.endTime ? <Text style={{color:'#FF0000',fontSize:16}}>{errors.endTime}</Text> : null}
							</TouchableOpacity>
						</View>
						<Dropdown
							data={[{value:'Two Wheeler'},{value:'Four Wheeler'},{value:'Other'}]}
							label='Mode of Travel'
							value={this.state.travelMode}
							onChangeText={ (travelMode) => this.setState({ travelMode }) }
							error={errors.travelMode}
						 />
						{this.state.travelMode !='Other' && this.state.travelMode !=''? <TextField
							label='Vehicle No'
							value={this.state.vehicleNo}
							onChangeText={ (vehicleNo) =>{
							this.setState({ vehicleNo })
						    }}
							error={errors.vehicleNo}                
						/> : null}

					</View>
				</Content>
				<View>
						<View style={styles.editDivider} />
						<TouchableOpacity
							 style={styles.footerBtnBg}
							onPress={() => this.onSubmit()}
							//onPress={() => this.props.navigation.push('HomeScreen')}

						>
							<Text style={styles.footerBtnTxt}>Submit</Text>
						</TouchableOpacity>
				</View>
					
			</Container>
			</Root>
		);
	}
}
UserProfile.propTypes = {
	auth:PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
	auth: state.auth,
  errors: state.errors,
  user:state.user
});


export default connect(mapStateToProps,{})(UserProfile)
