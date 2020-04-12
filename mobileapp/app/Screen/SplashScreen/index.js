import React from 'react'
import { Image, StyleSheet, StatusBar, ImageBackground, 
  TouchableHighlight,
  Animated, // provides methods for animating components
  Easing, // for implementing easing functions
  TouchableWithoutFeedback,
  Dimensions,
  Alert,
  AsyncStorage
 } from 'react-native'
import { Container, Header, Content, View,Text } from 'native-base'
import Style from '@Theme/Style';
import Spinner from 'react-native-spinkit';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
const deviceHeight = Dimensions.get('window').height;

//Action Declaration
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {loginUser,logoutCheck} from '@Action/authAction';
const { width, height } = Dimensions.get('window')
const styles = StyleSheet.create({
  imgContainer: {
    width: width,
    height: height,
  },
  image: {
    width: 250,
    height: 250,
  },
  bgIntroTopContent:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    height:hp('60%'),
  },
  bgIntroBottomContent:{
    justifyContent:'center',
    alignItems:'center',
    height:hp('20%'),
    marginHorizontal:40
  },
  titleText:{
    fontFamily:"nevis",
    fontSize:35,
    color:'#ffffff'
  },
  spinner: {
    marginTop: 20
  },
  logoText:{
    color:'#1f86b5',
    fontFamily:'Helvetica Neu Bold',
    fontSize:35,
    textTransform:'uppercase'
  }
});



class Splashscreen extends React.Component {
      constructor(){
        super();
        this.scaleValue = new Animated.Value(0);
        this.state={
          type: 'ThreeBounce',
          size: 60,
          color: "#273167",
          isVisible: true,
          modalY: new Animated.Value(-deviceHeight),
          modalX: new Animated.Value(deviceHeight+20)
        }
      }

async componentDidMount(){
  this.runAnimation();
 
  const otp = await AsyncStorage.getItem('otp');

  if(otp !== 'yes'){
    this.props.logoutCheck(this.props.navigation)
  }

     // Set start screen to load only once
      setTimeout(() => {
                  if(this.props.auth.isAuthenticated){
                    this.props.navigation.push('HomeScreen')
                  }else{
                    this.props.navigation.push('LoginScreen');
                  }
        }, 3000);  
}


runAnimation() {
  Animated.timing(this.state.modalY, {
      duration: 1500,
      toValue: 0
   }).start();
   Animated.timing(this.state.modalX, {
    duration: 1500,
    toValue: 0
  }).start();
  }

  render() {
    let transformStyle = { ...styles.bgIntroTopContent, transform: [{translateY: this.state.modalY}] };
    let transformStyleX = { ...styles.bgIntroBottomContent, transform: [{translateY: this.state.modalX}] };
    return <Container style={Style.bgPureWhite}>
    <StatusBar 
      backgroundColor='#ffffff'
      hidden = {true}
      animated 
      barStyle="dark-content" 
    />

    <View style={styles.bgIntroTopContent}>
          <Image source={require('@Asset/images/SplashScreen/splash-image1.png')} resizeMode='contain' style={{width:'100%',height:'100%'}}
          />
    </View>
    <View style={styles.bgIntroBottomContent}>
          <Image source={require('@Asset/images/SplashScreen/logo.png')} resizeMode='contain' style={{width:'90%',height:350}}
          />
    </View>
    <Animated.View style={transformStyleX}>
       <Spinner style={styles.spinner} isVisible={this.state.isVisible} size={this.state.size} type={this.state.type} color={this.state.color}/>
    </Animated.View>
    
</Container>
  }
}
Splashscreen.propTypes = {
  loginUser: PropTypes.func.isRequired,
  logoutCheck: PropTypes.func.isRequired,
  auth:PropTypes.object.isRequired,
  errors:PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps,{loginUser,logoutCheck})(Splashscreen);