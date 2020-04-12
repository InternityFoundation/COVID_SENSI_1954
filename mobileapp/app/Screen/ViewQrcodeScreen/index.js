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
	Icon
} from 'native-base';
import Style from '@Theme/Style';
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
import QRCode from 'react-native-qrcode';
class UserProfile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isloading:false,
			result:[],
			errors:{},
		};
	}
	componentDidMount(){
		this.setState({
			isloading:true
		})
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

	



	render() {
		StatusBar.setBarStyle('light-content', true);
		if (Platform.OS === 'android') {
			StatusBar.setBackgroundColor('#0e1130', true);
			StatusBar.setTranslucent(true);
		}
		const {user}=this.props.auth;
		const { navigation } = this.props;
		var qrcodeData= navigation.getParam('qrcodeData', 'NO-DATA')
		console.log("data",qrcodeData);
		return (
			<Root>
			<Container style={styles.container}>
				<Header androidStatusBarColor={'#273167'} style={[styles.header]}>
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
						<Text style={{fontSize:28,color:'#000',paddingVertical:5,lineHeight:35,fontFamily:'JosefinSans-SemiBold',}}>Pass Details</Text>
					</View>
					<View style={{justifyContent:'center',alignItems:'center',marginTop:15}}>
						<QRCode
							value={`http://ec2-3-6-145-165.ap-south-1.compute.amazonaws.com:5000/viewqr/${qrcodeData._id}`}
							size={200}
							bgColor='#273167'
							/>
					</View>
					<View style={{marginHorizontal:15}}>
						<Text style={{fontSize:20,color:'#000',paddingVertical:5,lineHeight:35,fontFamily:'JosefinSans-SemiBold',}}>Detailed Information</Text>
					</View>
					<View style={{marginHorizontal:15,justifyContent:'space-between',flexDirection:'row',marginTop:10}}>
						<Text style={{fontSize:20,color:'#000',paddingVertical:5,lineHeight:35,fontFamily:'JosefinSans-SemiBold',}}>Purpose of Travel</Text>
						<Text style={{fontSize:25,color:'#000',paddingVertical:5,lineHeight:35,fontFamily:'JosefinSans-SemiBold',}}>{qrcodeData.purpose}</Text>
					</View>
					<View style={{marginHorizontal:15,justifyContent:'space-between',flexDirection:'row',marginTop:10}}>
						<Text style={{fontSize:20,color:'#000',paddingVertical:5,lineHeight:35,fontFamily:'JosefinSans-SemiBold',}}>Date of Travel</Text>
						<Text style={{fontSize:25,color:'#000',paddingVertical:5,lineHeight:35,fontFamily:'JosefinSans-SemiBold',}}>{qrcodeData.selectedDate}</Text>
					</View>
					<View style={{marginHorizontal:15,justifyContent:'space-between',flexDirection:'row',marginTop:10}}>
						<Text style={{fontSize:20,color:'#000',paddingVertical:5,lineHeight:35,fontFamily:'JosefinSans-SemiBold',}}>Destination</Text>
						<Text style={{fontSize:25,color:'#000',paddingVertical:5,lineHeight:35,fontFamily:'JosefinSans-SemiBold',}}>{qrcodeData.destination}</Text>
					</View>
					<View style={{marginHorizontal:15,justifyContent:'space-between',flexDirection:'row',marginTop:10}}>
						<Text style={{fontSize:20,color:'#000',paddingVertical:5,lineHeight:35,fontFamily:'JosefinSans-SemiBold',}}>Time Alotted</Text>
						<Text style={{fontSize:25,color:'#000',paddingVertical:5,lineHeight:35,fontFamily:'JosefinSans-SemiBold',}}>{qrcodeData.timeAlotted}</Text>
					</View>
					<View style={{marginHorizontal:15,justifyContent:'space-between',flexDirection:'row',marginTop:10}}>
						<Text style={{fontSize:20,color:'#000',paddingVertical:5,lineHeight:35,fontFamily:'JosefinSans-SemiBold',}}>Start Time</Text>
						<Text style={{fontSize:25,color:'#000',paddingVertical:5,lineHeight:35,fontFamily:'JosefinSans-SemiBold',}}>{qrcodeData.startTime}</Text>
					</View>
					<View style={{marginHorizontal:15,justifyContent:'space-between',flexDirection:'row',marginTop:10}}>
						<Text style={{fontSize:20,color:'#000',paddingVertical:5,lineHeight:35,fontFamily:'JosefinSans-SemiBold',}}>End Time</Text>
						<Text style={{fontSize:25,color:'#000',paddingVertical:5,lineHeight:35,fontFamily:'JosefinSans-SemiBold',}}>{qrcodeData.endTime}</Text>
					</View>
					<View style={{marginHorizontal:15,justifyContent:'space-between',flexDirection:'row',marginTop:10}}>
						<Text style={{fontSize:20,color:'#000',paddingVertical:5,lineHeight:35,fontFamily:'JosefinSans-SemiBold',}}>Travel Mode</Text>
						<Text style={{fontSize:25,color:'#000',paddingVertical:5,lineHeight:35,fontFamily:'JosefinSans-SemiBold',}}>{qrcodeData.travelMode}</Text>
					</View>
					<View style={{marginHorizontal:15,justifyContent:'space-between',flexDirection:'row',marginTop:10}}>
						<Text style={{fontSize:20,color:'#000',paddingVertical:5,lineHeight:35,fontFamily:'JosefinSans-SemiBold',}}>Vehicle No</Text>
						<Text style={{fontSize:25,color:'#000',paddingVertical:5,lineHeight:35,fontFamily:'JosefinSans-SemiBold',}}>{qrcodeData.vehicleNo}</Text>
					</View>
					<View style={{marginHorizontal:15,justifyContent:'space-between',flexDirection:'row',marginTop:10}}>
						<Text style={{fontSize:20,color:'#000',paddingVertical:5,lineHeight:35,fontFamily:'JosefinSans-SemiBold',}}>City</Text>
						<Text style={{fontSize:25,color:'#000',paddingVertical:5,lineHeight:35,fontFamily:'JosefinSans-SemiBold',}}>{qrcodeData.location.city}</Text>
					</View>
					<View style={{marginHorizontal:15,justifyContent:'space-between',flexDirection:'row',marginTop:10}}>
						<Text style={{fontSize:20,color:'#000',paddingVertical:5,lineHeight:35,fontFamily:'JosefinSans-SemiBold',}}>State</Text>
						<Text style={{fontSize:25,color:'#000',paddingVertical:5,lineHeight:35,fontFamily:'JosefinSans-SemiBold',}}>{qrcodeData.location.state}</Text>
					</View>
					
				</Content>					
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
