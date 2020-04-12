import React, { Component,} from "react";
import { Image,AsyncStorage} from "react-native";
import {
  Content,
  Text,
  List,
  ListItem,
  Icon,
  Container,
  Left,
  Right,
  Badge,
  View,
} from "native-base";
import styles from "./Style";
import NavigationService from '@Service/Navigation'
const drawerImage = require("@Asset/images/avatar.png");
import {logoutUser} from "@Action/authAction";
//action declareation
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
const datas1 = [
  {
  name: "Packages",
  route: "ProductList",
  icon: "calendar",
},
{
  name: "My Reports",
  route: "OrderHistory",
  icon: "list",
},
{
  name: "My Profile",
  route: "Profile",
  icon: "user",
},
{
  name: "Alert Settings",
  route: "PublicMembers",
  icon: "bell",
},
{
  name: "Logout",
  route: "Logout",
  icon: "login",
},

];



class MenuLeft extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shadowOffsetWidth: 1,
      shadowRadius: 4
    };
  }
onnavigate(route){
  if(route==='Logout'){
   this.props.logoutUser(this.props.navigation)
  }else{
    this.props.navigation.navigate(route)
  }

}

  renderList(datas) {
    return (
      <List
        dataArray={datas}
        renderRow={data =>
          <ListItem
            button
            noBorder
            onPress={() => this.onnavigate(data.route)}
          >
            <Left>
              <Icon
                active
                name={data.icon}
                style={{ color: "#00A0E3", fontSize: 25, width: 30 }}
                type={data.type || 'SimpleLineIcons'}
              />
              <Text style={styles.text}>
                {data.name}
              </Text>
            </Left>
            {
              data.types &&
              <Right style={{ flex: 1 }}>
                <Badge>
                  <Text
                    style={styles.badgeText}
                  >{`${data.types}`}</Text>
                </Badge>
              </Right>
            }
          </ListItem>}
      />
    )
  }
  render() {
    return (
      <Container>
        <Content
          bounces={false}
          style={{ flex: 1, top: -1,}}
          render
        >
          <View  style={styles.drawerCover} />
          <View style={styles.drawerBg}>
            <Image square style={styles.drawerImage} source={drawerImage} />
            <Text style={styles.drawerText}>Russell Crowe</Text>
          </View>

          <View style={styles.divider}>
            {this.renderList(datas1)}
          </View>
         

        </Content>
      </Container>
    );
  }
}
MenuLeft.propTypes = {
  auth:PropTypes.object.isRequired,
  logoutUser:PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
	auth: state.auth,
  errors: state.errors,
  user:state.user,
  home:state.home
});


export default connect(mapStateToProps,{logoutUser})(MenuLeft)
