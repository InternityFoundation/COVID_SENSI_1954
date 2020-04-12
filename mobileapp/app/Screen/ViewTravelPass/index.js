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
		axios.get(API_URL+'/api/passbooking/getuser')
		.then(res=>{
			console.log("dta",res.data)
				this.setState({
					result:res.data,
					isloading:false
				})
		}).catch(err=>{
			console.log("err",err);
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
		const {isloading,result,errors}=this.state;
		var resultdata;
		if(isloading || result===null){
			resultdata=(<ActivityIndicator size="small"  color="#273167"/>)
		}else{
			if(Object.keys(result).length > 0){
				resultdata=result.map(res=>{
                    return  <View style={{backgroundColor:'#263592',marginHorizontal:20, marginVertical:10, borderRadius:10,flexDirection:'row'}}>
					<View style={{width:'25%',padding:10,marginTop:15}}>
						<Image   source={require("../../../assets/images/HomeScreen/icon/barcodel.png")} />
					</View>
					<View style={{width:'60%',padding:10}}>
						<Text style={{color:'#fff'}}>Purpose of Travel:<Text style={{fontWeight:'bold'}}>{res.purpose}</Text></Text>
						<Text style={{color:'#fff'}}>Date:<Text style={{fontWeight:'bold'}}>{res.selectedDate}</Text></Text>
						<Text style={{color:'#fff'}}>State Time:<Text style={{fontWeight:'bold'}}>{res.startTime}</Text></Text>  
						<Text style={{color:'#fff'}}>End Time:<Text style={{fontWeight:'bold'}}>{res.endTime}</Text></Text>
						<Text style={{color:'#fff'}}>Status:<Text style={{fontWeight:'bold'}}>{res.status}</Text></Text>    
					</View>
					<View style={{width:'15%',padding:10}}>
						{res.status==='Approved' ?<Icon name='check' style={Style.fBtnIcon} type="FontAwesome" /> :
						<Icon name='hourglass' style={Style.fBtnIcon} type="FontAwesome" />}
						{res.status ==='Approved' ? <Icon name='eye' onPress={()=>{
						this.props.navigation.push('ViewQrcodeScreen',{
							qrcodeData:res,
							pageName:'ViewTravelPass'
						})
						}} style={[Style.fBtnIcon,{marginTop:15,}]} size={30} type="SimpleLineIcons" /> : null}
					</View>
				</View>
                })
			}else{
				resultdata=(<View style={{flex:1,justifyContent:'center',alignItems:'center',alignSelf:'center'}}>
				<Text style={{fontSize:28,color:'#000',paddingVertical:5,lineHeight:35,fontFamily:'JosefinSans-SemiBold',}}>No History Found</Text>
				</View>)
			}
		}

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
						<Text style={{fontSize:28,color:'#000',paddingVertical:5,lineHeight:35,fontFamily:'JosefinSans-SemiBold',}}>Your Travel Pass History</Text>
					</View>
					  {/* //Profile Section */}
					 {resultdata}
						{/* //Profile Section END */}
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
