
import { Platform, StyleSheet, Dimensions } from 'react-native';
import { Fonts, Metrics, Colors } from '@Component/Themes';
const styles = StyleSheet.create({
	imgContainer: {
    width: Metrics.WIDTH,
    height: Metrics.HEIGHT,
  },
  header: {
    backgroundColor: Colors.transparent,
    height: Metrics.WIDTH * 0.15,
    borderBottomWidth: 0,
    ...Platform.select({
      ios: {},
      android: {
				marginTop: Fonts.moderateScale(25)
			}
    }),
		elevation: 0
  },
	left: {
		flex: 0.5,
		backgroundColor: 'transparent',
  },
	backArrow: {
		justifyContent: 'center',
		alignItems: 'center',
    width: 30
  },
	body: {
		flex: 3,
		alignItems: 'center',
		backgroundColor: 'transparent'
  },
	textTitle: {
    color: Colors.snow,
    fontSize: Fonts.moderateScale(16),
    marginTop: 5,
    alignSelf: 'center',
	  fontFamily: Fonts.type.sfuiDisplaySemibold,
  },
	right: {
    flex: 0.5
	},
	overlay: {
    flex: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    opacity: 0.5,
    backgroundColor: 'black',
    width:'90%'
  },
	logostyle: {
	//	marginTop: Fonts.moderateScale(10),
		//marginBottom: Fonts.moderateScale(30),
		paddingLeft:20,
		alignSelf:'center',
		justifyContent:'center'
		
	},
  inputFieldSec:{
    height: Metrics.HEIGHT * 0.12,
    justifyContent: 'flex-start',
		alignItems: 'center',
		padding:10,
		flexDirection:'row'
  },
	itememail: {
		alignSelf:'center',
	//	width: Metrics.WIDTH * 0.95,
		height: Metrics.HEIGHT * 0.08,
		backgroundColor:'#ffffff',
		fontSize:30,
		width:'80%',
	},
	itemcode: {
		alignSelf:'center',
	//	width: Metrics.WIDTH * 0.95,
		height: Metrics.HEIGHT * 0.08,
		backgroundColor:'#ffffff',
		fontSize:30,
		width:'20%',
	},
	inputemail: {
		marginLeft: Fonts.moderateScale(10),
		fontFamily: Fonts.type.sfuiDisplayRegular,
		color: '#000000'
  },
  itempassword: {
	  alignSelf: 'center',
		marginTop: 5,
		width: Metrics.WIDTH * 0.80,
		height: Metrics.HEIGHT * 0.08,
	},
	inputpassword: {
		marginLeft: Fonts.moderateScale(-15),
		fontFamily: Fonts.type.sfuiDisplayRegular,
		color: '#9b9fa2'
	},
	signInSec:{
    width: Metrics.WIDTH,
    height: Metrics.HEIGHT * 0.15,
    justifyContent: 'center',
		alignItems: 'center',
		bottom:0,
		position:'absolute'
  },
	buttondialogsignup:{
		backgroundColor: '#273167',
		justifyContent: 'center',
		alignItems: 'center',
		margin:10,
		marginVertical:20,
	},
	buttonsignin: {
		alignSelf: 'center',
		fontSize: Fonts.moderateScale(18),
		fontFamily: Fonts.type.sfuiDisplaySemibold,
		color: Colors.snow,
		padding: Fonts.moderateScale(9),
	},
	loginText: {
		alignSelf: 'center',
		fontSize: 12,
		fontFamily: 'Helvetica Neu Bold',
		color:'#a9a9a9',
		padding: Fonts.moderateScale(18),
		marginVertical:10,
		textAlign:'center'
	},
	forgotpass: {
	 marginTop: Fonts.moderateScale(10),
		fontSize: Fonts.moderateScale(17),
		color: '#9b9fa2',
		alignSelf: 'flex-end',
		justifyContent: 'center',
		fontFamily: Fonts.type.sfuiDisplayRegular,
		width: Metrics.WIDTH * 0.35,
	},

});
export default styles;
