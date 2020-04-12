const React = require("react-native");
const { Platform, Dimensions } = React;

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

export default {
  drawerCover: {
    alignSelf: "stretch",
    height: deviceHeight / 3.5,
    width: null,
    position: "relative",
    backgroundColor:'#00A0E3',
  },
  drawerBg: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems:'center',
    alignContent:'center',
    
  },
  drawerImage: {
    position: "absolute",
    left: Platform.OS === "android" ? deviceWidth / 15 : deviceWidth / 14,
    top: Platform.OS === "android" ? deviceHeight / 17 : deviceHeight / 14,
    resizeMode: "cover",
    borderRadius:50
  },
  drawerText: {
    position: "absolute",
    left: Platform.OS === "android" ? deviceWidth / 15 : deviceWidth / 14,
    top: Platform.OS === "android" ? deviceHeight / 5 : deviceHeight / 5,
    fontSize: 16,
    color: '#FFF',
    fontFamily: 'Montserrat-SemiBold',
  },
  text: {
    fontSize: 20,
    marginLeft: 20,
    color: '#333',

  },
  badgeText: {
    fontSize: Platform.OS === "ios" ? 13 : 11,
    fontWeight: "400",
    textAlign: "center",
    marginTop: Platform.OS === "android" ? -3 : undefined,
    justifyContent: "center",
  },
  divider: {
    borderColor: '#CCC',
    paddingBottom: 20,
    marginBottom: 20,
  },
  
};
