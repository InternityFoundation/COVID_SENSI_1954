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
			_id:'',
			name: '',
			mobile:'',
			gender: '',
			aadhaarNO:'',
			dob: '',
			panNO:'',
			rationCardNO:'',
			address:'',
			state:'',
			city: '',
			locationID:'',
			familyMember:'',
			lat: '',
			lng: '',
		};
	}
	componentDidMount(){
		this.setState({
			isloading:true
		})
		axios.get(API_URL+'/api/user/getuser')
		.then(res=>{
			console.log("dta",res.data)
				this.setState({
					name: res.data.name,
					mobile:res.data.mobile,
					gender: res.data.gender,
					aadhaarNO:res.data.aadhaarNO,
					dob: res.data.dob,
					panNO:res.data.panNO,
					rationCardNO:res.data.rationCardNO,
					address:res.data.address,
					state:res.data.state,
					city: res.data.city,
					locationID:res.data.locationID,
					familyMember:res.data.familyMember,
					lat: res.data.lat,
					lng: res.data.lng,
					_id:res.data._id,
					isloading:false,
					result:res.data
				})
		}).catch(err=>{
			console.log("err",err);
		})
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
		const data={
			name: this.state.name,
			mobile:this.state.mobile,
			gender: this.state.gender,
			aadhaarNO:this.state.aadhaarNO,
			dob: this.state.dob,
			panNO:this.state.panNO,
			rationCardNO:this.state.rationCardNO,
			address:this.state.address,
			state:this.state.state,
			city: this.state.city,
			locationID:this.state.locationID,
			familyMember:this.state.familyMember,
			lat: this.state.lat,
			lng: this.state.lng,
			_id:this.state._id,
			
		}
		if(Object.keys(this.state.errors).length ===0){
			axios.post(API_URL+'/api/user/updateProfile',data)
			.then(res=>{
				Toast.show({
					text: `Profile Updated Successfully`,
					type: 'success',
				   // buttonText: 'OK',
					duration: 3000,	
				  });
			// Alert.alert('','Profile Updated Successfully');

			})
			.catch(err=>{
				console.log("err",err)
				Toast.show({
					text: `Error Occured Try again Later`,
					type: 'danger',
				   // buttonText: 'OK',
					duration: 3000,	
				  });
				//Alert.alert('','Error Occured Try again Later');
			})
		}else{
			Toast.show({
				text: `Please Check All the Fields`,
				type: 'danger',
			   // buttonText: 'OK',
				duration: 3000,
				
			  });
			//Alert.alert('','Please Check All the Fields');
		}
	
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
			if(Object.keys(result).length >0){
				resultdata=( <View style={{marginHorizontal:30,marginTop:20}}>
					<TextField
						 label= {"Name"}
						 value={this.state.name}
						 onChangeText={ (name) =>{
							const validate=onlyletters.test(name);
							if(!validate &&name !=''){
							  errors['name']="Enter a valid Name";
							  this.setState({errors})
							}else{
							  delete errors['name']
							}
							this.setState({ name }) }}
							error={errors.name}                
					   />
						<TextField
							label={"Mobile"}
							value={this.state.mobile}
							onChangeText={ (mobile) => this.setState({ mobile }) }
							disabled={true}
						/>
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
				
					<TextField
					label={'Address'}
					value={this.state.address}
					onChangeText={ (address) => this.setState({ address }) }
					error={errors.address}
					/>
				 </View>)
			}else{
				resultdata=(<View style={{backgroundColor:'#273167',margin:10,padding:10}}>
				<Text style={{color:'#fff',fontSize:18}}>Your Account Waiting For Approval</Text>
			</View>)
			}
		}

		return (
			<Root>
			<Container style={styles.container}>
				<Header androidStatusBarColor={'#0e1130'} style={styles.header}>
					<Left style={styles.left}>
						<TouchableOpacity
							style={styles.backArrow}
							onPress={this.onBackClick.bind(this)}>
							<FontAwesome
								name={I18nManager.isRTL ? 'angle-right' : 'angle-left'}
								size={30}
								color="white"
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

				<View style={styles.mainView}>
					{resultdata}
				  <View style={styles.editInfoMainView}>
						<View style={styles.editDivider} />
						<TouchableOpacity
							 style={styles.footerBtnBg}
							onPress={() => this.onSubmit()}>
							<Text style={[styles.footerBtnTxt,{fontFamily:'JosefinSans-SemiBold'}]}>Save Changes</Text>
						</TouchableOpacity>
					</View>
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
