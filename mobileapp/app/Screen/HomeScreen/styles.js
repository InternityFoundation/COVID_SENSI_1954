import { Platform, StyleSheet, Dimensions } from "react-native";
const { height, width } = Dimensions.get("window");
import { Fonts, Metrics, Colors } from "@Component/Themes";

const styles = StyleSheet.create({
  mainview: {
    marginLeft: Metrics.HEIGHT * 0.045,
    marginTop: Metrics.HEIGHT * 0.15,
    marginBottom: Metrics.HEIGHT * 0.15
  },
  btnLayout: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    marginHorizontal: 20,
    marginTop: 15,
    marginBottom: 30,
    backgroundColor: '#FFF',
    borderRadius: 0,
    elevation: 10,
    shadowOffset: {
        width: 15,
        height: 15
    },
    shadowColor: '#999',
    shadowOpacity: 0.1,
    shadowRadius: 0,
    ...Platform.select({
        ios: {
            shadowOffset: {
                width: 5,
                height: 5
            },
        },
    }),
},
stepBg: {
    alignSelf: "center",
    marginTop: Metrics.HEIGHT * 0.04,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
  },

  stepCountBg: {
    width: Metrics.WIDTH * 0.05,
    height: Metrics.WIDTH * 0.05,
    borderRadius: Metrics.WIDTH * 0.025,
    alignItems: "center",
    justifyContent: "center"
  },

  stepCountTxt: {
    color: "#fff",
    fontSize: Fonts.moderateScale(12),
    fontFamily: Fonts.type.helveticaNeueBold
  },

  stepDistance: {
    width: Metrics.WIDTH * 0.20,
    height: 4
  },
btnBox: {
  padding: 10,
  justifyContent: 'center',
  alignItems: 'center',
  width: '49%',
  marginBottom: 1,
  borderColor: '#f0f0f0',
},
btnBoxRight: {
  padding: 10,
  justifyContent: 'center',
  alignItems: 'center',
  width: '49%',
  marginBottom: 1,
  borderColor: '#f0f0f0',
},
  headertxt: {
    fontSize: 32,
    textAlign: "center",
    color: "white"
  },

  listrow: {
    backgroundColor: "transparent",
    flexDirection: "row",
    marginBottom: Metrics.HEIGHT * 0.04
  },

  rowtxt: {
    color: "white",
    fontSize: 20,
    backgroundColor: "transparent",
    marginLeft: Metrics.HEIGHT * 0.025,
    textAlign: "center",
    fontFamily: "SFUIDisplay-Regular"
  },

  rowCountText: {
    color: "white",
    fontSize: 17,
    backgroundColor: "transparent",
    textAlign: "center",
    fontFamily: "SFUIDisplay-Regular",
    paddingLeft: Metrics.HEIGHT * 0.015,
    paddingRight: Metrics.HEIGHT * 0.015
  },

  rowCountBg: {
    backgroundColor: "#d9b63e",
    borderRadius: 20,
    marginLeft: Metrics.HEIGHT * 0.025,
    justifyContent: "center",
    alignItems: "center",
    height: Metrics.HEIGHT * 0.045
  },

  headerMenu: {
    backgroundColor: "red",
    height: 56,
    marginLeft: -(Metrics.WIDTH * 0.05),
    borderBottomWidth: 0,
    ...Platform.select({
      ios: {},
      android: {
        height: 66,
        paddingTop: Metrics.HEIGHT * 0.02
      }
    }),
    elevation: 0
  },

  header: {
    backgroundColor: "#273167",
    borderBottomWidth: 0,
    ...Platform.select({
      ios: {
        height: 56
      },
      android: {
        height: 50,
        paddingTop: Metrics.HEIGHT * 0.01
      }
    }),
    elevation: 0,
    paddingLeft: Metrics.WIDTH * 0.05,
    paddingRight: Metrics.WIDTH * 0.05
  },

  left: {
    flex: 0.5,
    backgroundColor: "transparent"
  },

  body: {
    flex: 1,
    alignItems: "center"
  },

  right: {
    flex: 0.5
  },

  headerTitle: {
    color: "#fff",
    fontFamily: "SFUIDisplay-Semibold",
    fontSize: Fonts.moderateScale(18)
  },

  iconColor: {
    color: "#fff"
  },

  forgotPassword: {
    color: "#0691ce",
    fontSize: Fonts.moderateScale(17),
    height: Metrics.HEIGHT * 0.05,
    width: Metrics.WIDTH,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    textAlign: "center",
    backgroundColor: "transparent",
    top: Metrics.HEIGHT * 0.44,
    fontFamily: "SFUIDisplay-Regular"
  },

  menuListItem: {
    marginLeft: Metrics.WIDTH * 0.03,
    color: "#fff",
    fontSize: Fonts.moderateScale(20),
    fontFamily: "SFUIDisplay-Regular"
  },

  menuIcon: {
    width: Metrics.WIDTH * 0.06,
    height: Metrics.WIDTH * 0.06,
    resizeMode: "contain"
  },

  imgContainer: {
    height: Metrics.HEIGHT,
    resizeMode: "cover"
  },

  listProfileContainer: {
    height: Metrics.HEIGHT * 0.9,
    backgroundColor: "transparent"
  },

  profileDataBg: {
    flexDirection: "row",
    marginTop: Metrics.HEIGHT * 0.07,
    alignItems: "center",
    marginLeft: Metrics.WIDTH * 0.08,
    width: Metrics.WIDTH * 0.45,
    alignSelf: "center",
    marginLeft: -(Metrics.WIDTH * 0.02),
    justifyContent: "center"
  },

  profileImg: {
    width: Metrics.WIDTH * 0.15,
    height: Metrics.WIDTH * 0.15,
    borderRadius: Metrics.WIDTH * 0.075
  },

  circles: {
    borderRadius: Metrics.WIDTH * 0.08,
    borderColor: "#fff",
    borderWidth: 2
  },

  nameTxt: {
    textAlign: "center",
    color: "white",
    fontFamily: Fonts.type.sfuiDisplayBold,
    fontSize: Fonts.moderateScale(15),
    marginLeft: -(Metrics.WIDTH * 0.03),
    marginTop: Metrics.WIDTH * 0.05
  },

  addressTxt: {
    textAlign: "center",
    color: "#a6a7ab",
    fontFamily: Fonts.type.sfuiDisplayRegular,
    fontSize: Fonts.moderateScale(13),
    marginLeft: -(Metrics.WIDTH * 0.03)
  },

  bottomViewBg: {
    flexDirection: "row",
    height: Metrics.HEIGHT * 0.1,
    backgroundColor: "#0691ce",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: Metrics.WIDTH * 0.05,
    paddingRight: Metrics.WIDTH * 0.02
  },

  bottomImageDataBg: {
    flexDirection: "row",
    alignItems: "center"
  },

  bottomImage: {
    width: Metrics.WIDTH * 0.12,
    height: Metrics.WIDTH * 0.12,
    borderRadius: Metrics.WIDTH * 0.06,
    borderWidth: 1,
    borderColor: "#fff"
  },

  bottomNameTxt: {
    color: "#919191",
    fontSize: Fonts.moderateScale(13),
    fontFamily: "SFUIDisplay-Regular"
  },

  profileBg: {
    height: Metrics.HEIGHT * 0.28,
    alignItems: "center"
  },

  settingIcon: {
    width: Metrics.WIDTH * 0.05,
    height: Metrics.WIDTH * 0.05,
    resizeMode: "contain",
    marginLeft: Metrics.WIDTH * 0.06
  },

  bellIcon: {
    color: "#595b6a",
    marginRight: Metrics.WIDTH * 0.06
  },

  cartCountBg: {
    marginTop: -(Metrics.HEIGHT * 0.04),
    marginLeft: -(Metrics.WIDTH * 0.03),
    width: Metrics.WIDTH * 0.04,
    height: Metrics.WIDTH * 0.04,
    borderRadius: Metrics.WIDTH * 0.02,
    backgroundColor: "#ff0000",
    alignItems: "center",
    justifyContent: "center"
  },

  cartItemCount: {
    color: Colors.snow,
    fontSize: Fonts.moderateScale(10),
    fontFamily: Fonts.type.sfuiDisplayRegular
  },

  bottomTxt: {
    color: Colors.snow,
    fontSize: Fonts.moderateScale(22)
  },

  bottomPriceTxt: {
    color: Colors.snow,
    fontSize: Fonts.moderateScale(20)
  },

  menuListSec: {
    height: Metrics.HEIGHT * 0.62
  },

  container: {
    backgroundColor: "#11142a",
    justifyContent: "center",
    alignItems: "center"
  },

  menuStyleSec: {
    backgroundColor: "transparent"
  },

  titleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },

  titleCollapse: {
    flexDirection: "row"
  },

  headerTitleMenu: {
    flexDirection: "row",
    alignItems: "center"
  },

  HeaderExpandMenu: {
    paddingTop: Metrics.WIDTH * 0.03,
    paddingBottom: Metrics.WIDTH * 0.03,
    color: Colors.snow,
    fontSize: Fonts.moderateScale(20),
    textAlign: "center"
  },

  mybodyText: {
    paddingTop: 5,
    paddingBottom: 5,
    color: "#adafc1",
    fontSize: Fonts.moderateScale(15),
    textAlign: "center",
    paddingLeft: Metrics.WIDTH * 0.04
  },

  submenutitleSec: {
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "transparent",
    justifyContent: "space-between"
  },

  subTitleTxt: {
    fontSize: Fonts.moderateScale(15),
    width: Metrics.WIDTH * 0.71,
    color: "#adafc1",
    textAlign: "center",
    paddingLeft: Metrics.WIDTH * 0.02
  },

  titleTxt: {
    width: Metrics.WIDTH * 0.71,
    fontSize: Fonts.moderateScale(18),
    color: "white",
    textAlign: "center"
  },

  subTitleBg: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: Metrics.WIDTH * 0.04,
    marginRight: 10
  },

  nextArrow: {
    paddingRight: Metrics.WIDTH * 0.07,
    marginRight: Metrics.WIDTH * 0.07
  },

  searchViewBg: {
    backgroundColor: "#e9e9e9",
    width: Metrics.WIDTH,
    height: Metrics.HEIGHT * 0.08,
    justifyContent: "center",
    alignItems: "center"
  },

  searchView: {
    backgroundColor: Colors.snow,
    borderRadius: 5,
    width: Metrics.WIDTH * 0.95,
    height: Metrics.HEIGHT * 0.06,
    alignItems: "center",
    flexDirection: "row"
  },

  searchText: {
    color: "#8e8e93",
    fontSize: Fonts.moderateScale(15),
    fontFamily: Fonts.type.sfuiDisplayRegular,
    marginLeft: Metrics.WIDTH * 0.03
  },
  alertTxt: {
		fontSize: Fonts.moderateScale(8),
		fontFamily: Fonts.type.sfuiDisplayMedium,
		color: Colors.snow,
	},
	bagIcon: {
		marginLeft: Metrics.WIDTH * 0.04,
		color: Colors.snow,
  },
  alertBg: {
		width: Metrics.WIDTH * 0.03,
		height: Metrics.WIDTH * 0.03,
		borderRadius: Metrics.WIDTH * 0.015,
		backgroundColor: '#ff0000',
		alignItems: 'center',
		justifyContent: 'center',
		marginLeft: -(Metrics.WIDTH * 0.018),
	},
  listContent: {
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "#fff",
    paddingVertical: Fonts.moderateScale(3),

  },

  coverImageStyle: {
    width: Metrics.WIDTH * 0.5,
    height: Metrics.HEIGHT * 0.3425,
    borderWidth: Fonts.moderateScale(1),
    borderColor: "#fff",
    alignItems: "center",
    marginVertical:10
    
  },

  categoryBtn: {
    height: Metrics.HEIGHT * 0.04,
    paddingHorizontal: Metrics.WIDTH * 0.025,
    bottom: Metrics.HEIGHT * 0.015,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center"
  },

  buttonText: {
    color: "#fff",
    fontSize: Fonts.moderateScale(13),
    fontFamily: Fonts.type.sfuiDisplayLight,
    textAlign: "center"
  },

  slidesec: {
    height: Metrics.HEIGHT * 0.3,
    backgroundColor: Colors.transparent
  },

  dot: {
    backgroundColor: "#d4d4d4",
    width: Metrics.WIDTH * 0.02,
    height: Metrics.WIDTH * 0.02,
    borderRadius: Metrics.WIDTH * 0.01,
    marginLeft: Metrics.WIDTH * 0.005,
    marginRight: Metrics.WIDTH * 0.005
  },

  activeDot: {
    backgroundColor: "#0691ce",
    width: Metrics.WIDTH * 0.02,
    height: Metrics.WIDTH * 0.02,
    borderRadius: Metrics.WIDTH * 0.01,
    marginLeft: Metrics.WIDTH * 0.005,
    marginRight: Metrics.WIDTH * 0.005
  },

  slide: {
    height: Metrics.HEIGHT * 0.3,
    backgroundColor: Colors.transparent
  },

  sliderImage: {
    resizeMode: "cover",
    height: Metrics.HEIGHT * 0.3,
    width: Metrics.WIDTH,
    backgroundColor: "grey"
  },

  contentStyle: {
    position: "absolute",
    alignSelf: "center",
    alignItems: "center",
    top: Metrics.HEIGHT * 0.055
  },

  headertext: {
    fontFamily: Fonts.type.helveticaNeueBold,
    backgroundColor: Colors.transparent,
    fontSize: Fonts.moderateScale(16),
    textAlign: "center",
    alignSelf: "center",
    color: "#0e1130"
  },

  desctext: {
    fontFamily: Fonts.type.helveticaNeueLight,
    backgroundColor: Colors.transparent,
    fontSize: Fonts.moderateScale(23),
    textAlign: "center",
    alignSelf: "center",
    color: "#8d1b1b",
    lineHeight: Fonts.moderateScale(23)
  },

  newArrivalSec: {
    flexDirection: "row",
    paddingTop: Metrics.HEIGHT * 0.032,
    paddingBottom: Metrics.HEIGHT * 0.01,
    backgroundColor: "#fff"
  },

  sideButtons: {
    flex: 1,
    height: Metrics.HEIGHT * 0.05,
    alignItems: "center",
    justifyContent: "center"
  },

  newArrivalBody: {
    flex: 9,
    height: Metrics.HEIGHT * 0.05,
    alignItems: "center",
    justifyContent: "center"
  },

  titelText: {
    fontFamily: Fonts.type.helveticaRegular,
    fontSize: Fonts.moderateScale(14),
    textAlign: "center",
    alignSelf: "center",
    color: "#362f2d"
  },

  rowMain: {
    backgroundColor: Colors.snow,
    width: Metrics.WIDTH * 0.445,
    alignItems: "flex-start",
    alignContent: "flex-start",
    margin: Metrics.WIDTH * 0.0165
  },

  itemImage: {
    width: Metrics.WIDTH * 0.445,
    height: Metrics.WIDTH * 0.64
  },

  itemTitle: {
    width: Metrics.WIDTH * 0.445,
    color: "#0e1130",
    fontSize: Fonts.moderateScale(15),
    fontFamily: Fonts.type.helveticaNeueLight,
    marginTop: Metrics.HEIGHT * 0.015,
    textAlign: "left",
    marginLeft: 5
  },

  itemPrice: {
    width: Metrics.WIDTH * 0.445,
    color: "#ff0000",
    fontSize: Fonts.moderateScale(15),
    fontFamily: Fonts.type.helveticaNeueBold,
    marginTop: Metrics.HEIGHT * 0.01,
    marginBottom: Metrics.HEIGHT * 0.01,
    textAlign: "left",
    marginLeft: 5
  },

  swiperView: {
    height: Metrics.HEIGHT * 0.525
  },

  newArrivalView: {
    flexDirection: "row",
    padding: Metrics.HEIGHT * 0.01
  },

  searchInput: {
    color: "#6d6d71",
    fontSize: Fonts.moderateScale(15),
    fontFamily: Fonts.type.sfuiDisplayRegular,
    ...Platform.select({
      ios: {}
    })
  },

  backArrow: {
    justifyContent: "center",
    alignItems: "center"
  },
  content: {
		width: Metrics.WIDTH,
	//	height: Metrics.HEIGHT * 0.9,
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignItems: 'flex-start',
		alignContent: 'flex-start',
		justifyContent: 'space-between',
  },
  rowMain: {
		width: Metrics.WIDTH * 0.5,
		height: Metrics.HEIGHT * 0.3,
		justifyContent: 'center',
		alignItems: 'center',
		borderColor: Colors.veryLightGray,
		backgroundColor: Colors.white,
		borderWidth: 0.5,
	},

	imageContainer: {
		width: Metrics.HEIGHT * 0.065,
		height: Metrics.HEIGHT * 0.065,
		justifyContent: 'center',
		alignItems: 'center',
	},

	itemImgStyle: {
		width: Metrics.HEIGHT * 0.055,
		height: Metrics.HEIGHT * 0.055,
		resizeMode: 'contain',
	},

	itemText: {
		color: Colors.drakBlue,
		fontFamily: Fonts.type.helveticaNeueLight,
		fontSize: Fonts.moderateScale(16),
		marginTop: Metrics.HEIGHT * 0.03,
	},

	notificationCircle: {
		position: 'absolute',
		top: 0,
		left: Metrics.HEIGHT * 0.045,
		width: Metrics.HEIGHT * 0.026,
		height: Metrics.HEIGHT * 0.026,
		borderRadius: Metrics.HEIGHT * 0.013,
		backgroundColor: Colors.red,
		justifyContent: 'center',
		alignItems: 'center',
	},

	notification: {
		color: Colors.white,
		fontFamily: Fonts.type.helveticaNeueLight,
		fontSize: Fonts.moderateScale(12),
		backgroundColor: 'transparent',
  },
  cardContainer:{
    marginTop:20,
    paddingHorizontal:30,
    justifyContent:'space-between',
    flexDirection:'row',
  },
  cardView:{
    width:'45%',backgroundColor:'#273167',
    height:150,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:10
  },
  cardText:{
    fontSize:25,
    color:'#ffffff',
    fontFamily:'JosefinSans-SemiBold',
    paddingVertical:10
  }
});



export default styles;
