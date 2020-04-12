import React from 'react';
import { StatusBar, TouchableOpacity, TextInput, StyleSheet, Image, ImageBackground, Dimensions, ScrollView, Platform, SafeAreaView, FlatList, ToolbarAndroid } from 'react-native'
import { Container, Header, Content, Button, Icon, Text, Title, Left, Right, Body, Input, Item, Footer, View, FooterTab, Badge } from 'native-base'
import Style from '@Theme/Style';
import Styles from '@Screen/HomeScreen/Style';


function FooterUI() {
  return <View style={Style.footer}>
  <View style={Style.fNav}>
      <Button transparent style={Style.fBtn} onPress={() => {
          this.props.navigation.navigate('HomeScreen')
      }}>
          <Icon name='home' style={Style.fBtnIconActive} type="FontAwesome" />
          <Text style={Style.footerText}>Home</Text>
      </Button>
  </View>
  <View style={Style.fNav}>
      <Button transparent style={Style.fBtn} onPress={() => {
          this.props.navigation.navigate('HomeScreen')
      }}>
          <Icon name='book' style={Style.fBtnIcon} type="Octicons" />
          <Text style={Style.footerText}>Article</Text>
      </Button>
  </View>
  <View style={Style.fNav}>
      <Button transparent style={Style.fBtn} onPress={() => {
          this.props.navigation.navigate('ServiceScreen')
      }}>
          <Icon name='heartbeat' style={Style.fBtnIcon} type="FontAwesome" />
          <Text style={Style.footerText}>Service</Text>
      </Button>
  </View>
  <View style={Style.fNav}>
      <Button transparent style={Style.fBtn} onPress={() => {
          this.props.navigation.navigate('HomeScreen')
      }}>
          <Icon name='file-o' style={Style.fBtnIcon} type="FontAwesome" />
          <Text style={Style.footerText}>Records</Text>
      </Button>
  </View>
</View>


  
}

export default FooterUI;