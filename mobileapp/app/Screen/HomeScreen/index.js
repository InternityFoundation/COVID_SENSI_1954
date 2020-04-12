import React, { Component } from "react";
import {
  ListView,
  View,
  Image,
  StatusBar,
  TouchableOpacity,
  Platform,
  ImageBackground,
  BackHandler,
  I18nManager,
  TextInput,
  AsyncStorage,
  ActivityIndicator,
  Alert,
  Linking,
  RefreshControl,
  ScrollView,
  FlatList
} from "react-native";
import {
  Root,
  Toast,
  Text,
  Container,
  Content,
  Button,
  Icon,
  Right,
  Item,
  Input,
  Header,
  Left,
  Body,
  Title
} from "native-base";
// Screen Styles
import styles from './styles';
import Style from '@Theme/Style';
import Styles from './Style';

import MarqueeText from 'react-native-marquee';
import Ionicons from "react-native-vector-icons/Ionicons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Fonts, Metrics, Colors, Images } from "@Component/Themes";
import { SliderBox } from 'react-native-image-slider-box';
//action declareation
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import axios from 'axios';
import {API_URL,IMAGE_URL} from "@Action/constant";
import {getPopular} from "@Action/homeAction";
import {logoutUser} from "@Action/authAction";

import { heightPercentageToDP as hp ,widthPercentageToDP as wp } from 'react-native-responsive-screen';
var productData=[];
/**
 *  Profile Screen
 */



class HomeScreen extends Component {
  constructor(props) {
    super(props);
    const rowHasChanged = (r1, r2) => r1 !== r2;
		const ds = new ListView.DataSource({ rowHasChanged });

		const dataObjects = [
			{
				id: 1,
				title: 'My Wallet',
        itemImg: require("@Asset/images/Settings/mywallet.png"),
				icon: 'wallet',
        
			},
			{
				id: 2,
				title: 'Transaction',
				itemImg:require("@Asset/images/Settings/transactions.png"),
			},
			{
				id: 3,
				title: 'My Package',
				itemImg:require("@Asset/images/Settings/cart.png"),
			},
			{
				id: 6,
				title: 'My Docs',
				itemImg: require("@Asset/images/Settings/documents.png"),
      },
      {
				id: 7,
				title: 'No Claim Bonus',
				itemImg: require("@Asset/images/Settings/noclaim.png"),
      },
      {
				id: 7,
				title: 'Gifts',
				itemImg: require("@Asset/images/Settings/gifts.png"),
      },
      {
				id: 8,
				title: 'My Buddy',
				itemImg: require("@Asset/images/Settings/caregiver.png"),
      },
      {
				id: 8,
				title: 'Share',
				itemImg: require("@Asset/images/Settings/share.png"),
			},
		];

		this.state = {
			dataSource: ds.cloneWithRows(dataObjects),
		};
  }

  componentWillMount() {
    var that = this;
    BackHandler.addEventListener("hardwareBackPress", this.backPressed);
   
  }

  backPressed = () => {
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
   
  };

componentDidMount(){
    
}

alertItemName = rowData => {
  var name = rowData.title;

  if (name === 'My Wallet') {
    this.props.navigation.push('WalletInformation',{
      pageName:'HomeScreen'
    });
  } else if (name === 'Transaction') {
    this.props.navigation.push('OrderHistory',{
      pageName:'HomeScreen'
    });
  } else if (name === 'My Package') {
    this.props.navigation.push('ProductList',{
      pageName:'HomeScreen'
    });
  } else if (name === 'My Docs') {
    this.props.navigation.push('Report',{
      pageName:'HomeScreen'
    });
  } else if (name === 'No Claim Bonus') {
    this.props.navigation.push('NoClaim',{
      pageName:'HomeScreen'
    });
  } else if (name === 'Gifts') {
    this.props.navigation.push('Gifts',{
      pageName:'HomeScreen'
    });
  } else if (name === 'My Buddy') {
    this.props.navigation.push('Buddy',{
      pageName:'HomeScreen'
    });
  } else if (name === 'Share') {
    this.props.navigation.push('Share',{
      pageName:'HomeScreen'
    });
  }
   else if (name === 'Logout') {

    this.props.logoutUser(this.props.navigation);
  }
};

_renderItem(rowData) {
  return (
    <TouchableOpacity
      style={styles.rowMain}
      onPress={() => this.alertItemName(rowData)}>
      <View style={styles.imageContainer}>
        <Image source={rowData.itemImg} style={styles.itemImgStyle} />
        {rowData.notification ? (
          <View style={styles.notificationCircle}>
            <Text style={styles.notification}>3</Text>
          </View>
        ) : null}
      </View>
      <Text style={styles.itemText}>{rowData.title}</Text>
    </TouchableOpacity>
  );
}

logout(){
  console.log("logout called");
  this.props.logoutUser(this.props.navigation)
}

  render() {

    StatusBar.setBarStyle("light-content", true);
    if (Platform.OS === "android") {
      StatusBar.setBackgroundColor("#273167", true);
      StatusBar.setTranslucent(true);
    }
  

    return (
      <Root>
      <Container style={Style.bgPureGrey}>
        <Header style={styles.header} androidStatusBarColor={"#273167"}>
          <Left style={styles.left}>
          </Left>
          <Body style={styles.body}>
            {/* <Text style={{color:'#ffffff',fontWeight:'bold',fontSize:15}}>Tarnaka,Hyderabad  <Icon name='angle-down' style={Style.fBtnIcon} type="FontAwesome" /></Text> */}
          </Body>
          <View style={[Style.actionBarRight]}>
                <Icon name="power-off" type="FontAwesome" style={{color: '#ffffff'}} onPress={()=>this.logout()}/>
          </View> 
        </Header>
       
        <Content>
        {/* <ListView
						contentContainerStyle={styles.content}
						dataSource={this.state.dataSource}
						renderRow={this._renderItem.bind(this)}
						enableEmptySections
						scrollEnabled={false}
						pageSize={4}
          /> */}
         <View style={styles.cardContainer}>
              {/* //card Design */}
              <TouchableOpacity style={styles.cardView} onPress={()=>this.props.navigation.push('TravelPass')}>
                      <Image source={require("../../../assets/images/HomeScreen/icon/icon1.png")} resizeMode="contain" style={{width:100,hight:100}}/>
                      <Text style={styles.cardText}>Travel Pass</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cardView}  onPress={()=>Alert.alert('','Coming Soon')}>
                      <Image source={require("../../../assets/images/HomeScreen/icon/icon2.png")} resizeMode="contain" style={{width:100,hight:100}}/>
                      <Text style={styles.cardText}>For Seller</Text>
              </TouchableOpacity>              
         </View>
         <View style={styles.cardContainer}>
              {/* //card Design */}
              <TouchableOpacity style={styles.cardView} onPress={()=>Alert.alert('','Coming Soon')}>
                      <Image source={require("../../../assets/images/HomeScreen/icon/icon3.png")} resizeMode="contain" style={{width:100,hight:100}}/>
                      <Text style={styles.cardText}>For PDS</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cardView} onPress={()=>Alert.alert('','Coming Soon')}>
                      <Image source={require("../../../assets/images/HomeScreen/icon/icon4.png")} resizeMode="contain" style={{width:100,hight:100}}/>
                      <Text style={styles.cardText}>Buy Items</Text>
              </TouchableOpacity>              
         </View>
         <View style={styles.cardContainer}>
              {/* //card Design */}
              <TouchableOpacity style={styles.cardView} onPress={()=>Alert.alert('','Coming Soon')}>
                      <Image source={require("../../../assets/images/HomeScreen/icon/icon5.png")} resizeMode="contain" style={{width:100,hight:100}}/>
                      <Text style={styles.cardText}>SOS</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cardView} onPress={()=>this.props.navigation.push('CreateSurvey')}>
                      <Image source={require("../../../assets/images/HomeScreen/icon/icon6.png")} resizeMode="contain" style={{width:100,hight:100}}/>
                      <Text style={styles.cardText}>Volunteer</Text>
              </TouchableOpacity>              
         </View>

        </Content>
    
        <View style={Style.footer}>
                <View style={Style.fNav}>
                    <Button transparent style={Style.fBtn} 
                    onPress={() => {
                      this.props.navigation.push('HomeScreen',{
                       activeTabIndex:3
                      })
                     }} >
                        <Icon name='home' style={Style.fBtnIcon} type="SimpleLineIcons" />
                        <Text style={{color:'#fff',fontSize:12,fontFamily:'JosefinSans-SemiBold',}}>Home</Text>
                    </Button>
                </View>
                <View style={Style.fNav}>
                    <Button transparent style={Style.fBtn}  onPress={() => {
                      this.props.navigation.push('ViewTravelPass')
                     }} >
                        <Icon name='qrcode' style={[Style.fBtnIcon,{fontSize:30}]} type="FontAwesome" />
                        <Text style={{color:'#fff',fontSize:12,fontFamily:'JosefinSans-SemiBold',}}>View Pass</Text>
                    </Button>
                </View>
                <View style={Style.fNav}>
                    <Button transparent style={Style.fBtn}  onPress={() => {
                      this.props.navigation.push('EditUserProfile')
                     }} >
                        <Icon name='user' style={Style.fBtnIcon} type="SimpleLineIcons" />
                        <Text style={{color:'#fff',fontSize:12,fontFamily:'JosefinSans-SemiBold',}}>MY PROFILE</Text>
                    </Button>
                </View>    
            </View>
      </Container>
  </Root>
    );
  }
}
HomeScreen.propTypes = {
  auth:PropTypes.object.isRequired,
  getPopular:PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
	auth: state.auth,
  errors: state.errors,
  user:state.user,
  home:state.home
});


export default connect(mapStateToProps,{getPopular,logoutUser})(HomeScreen)
