import React from 'react'
import {Alert,I18nManager,BackHandler,DatePickerAndroid,ListView,NetInfo,StatusBar,PermissionsAndroid, TouchableOpacity, TextInput, StyleSheet, Image, ImageBackground, Dimensions, ScrollView, Platform, SafeAreaView, FlatList, ToolbarAndroid } from 'react-native'
import {Root, Container, Header, Content, Button, Icon, Text, Title, Left, Right, Body, Input, Item, Footer, View, FooterTab, Badge,Toast } from 'native-base'
import Style from '@Theme/Style';
import styles from '@Screen/CreateSurvey/Style';
import axios from 'axios';
import {logoutUser} from "@Action/authAction";
import {API_URL,pincode,onlyletters,onlynumbers,numberwithdot,
    letterswithdot,floatnumbers,
    mobilenumber,email,voterCheck,adhaarCheck} from "@Action/constant";
//action declareation
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { TextField } from 'react-native-materialui-textfield';
import { Dropdown } from 'react-native-material-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

class CreateSurvey extends React.Component {
    constructor(){
        super()
        this.state={
          spinner: false,
          name:"",
          dob:"",
          gender:"",
          fatherName:"",
          aadhaarNO:"",
          voterID:"",
          mobile:"",
          doorNo:"",
          street:"",
          area:"",
          district:"",
          pinCode:"",
          livingHere:"",
          police:"",
          otherInfo:"",
          state:"TamilNadu",
          errors:{},
        }
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
        this.getAddress=this.getAddress.bind(this);
    }
    
  
    
    logout(){
        this.props.logoutUser(this.props.navigation)
    }
    onSubmit(){
            const data={
                name:this.state.name,
                dob:this.state.dob,
                gender:this.state.gender,
                fatherName:this.state.fatherName,
                aadhaarNO:this.state.aadhaarNO,
                voterID:this.state.voterID,
                mobile:this.state.mobile,
                doorNo:this.state.doorNo,
                street:this.state.street,
                area:this.state.area,
                district:this.state.district,
                pinCode:this.state.pinCode,
                state:this.state.state,
                livingHere:this.state.livingHere,
                police:this.state.police,
                otherInfo:this.state.otherInfo,

            }
            this.props.navigation.push('QuestionList',{
                basicData:data
            })
    }

   
    componentDidMount() {
        PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE)
        // This is the first method in the activity lifecycle
        // Addding Event Listener for the BackPress 
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);

       
    }

    setData(temp){
       
    }
  
    getAddress(){
        axios.get(API_URL+'/api/survey/getaddress')
        .then(res=>{
              var temp=res.data;
              this.setState({
                name:temp.name,
                doorNo:temp.doorNo,
                street:temp.street,
                area:temp.area,
                district:temp.district,
                pinCode:temp.pinCode,
            })
             

        })
        .catch(err=>{
          console.log("err",err);
          Alert.alert('','Error Occured Try Again',
          [
            {text: 'OK', onPress: ()=>console.log("error")},
          ],
          {cancelable: false},
          );
        })
    }
     
      handleBackButtonClick() {
        // Registered function to handle the Back Press
        // To popup the default screen while going back you can use goBack
       // this.props.navigation.push("QrScannerScreen");
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
        // To exit from your App you can use BackHandler.exitApp();. 
        // Just comment the above line and uncomment the below to use it 
        //BackHandler.exitApp();
        // Returning true means we have handled the backpress
        // Returning false means we haven't handled the backpress
        // Try to make it false also
        return true;
      }
     async dateChange(name){
        try {
            var {action, year, month, day} = await DatePickerAndroid.open({
              // Use `new Date()` for current date.
              // May 25 2020. Month 0 is January.
              date: new Date(),
              maxDate:new Date(),
            });
            if (action !== DatePickerAndroid.dismissedAction) {
              let tempmonth=month+1;
              if (tempmonth < 9) month = '0' + (month+1);
              else  month = tempmonth;
              if (day < 9) day = '0' + day;  
                 var date =day+'-'+month+'-'+year;
                this.setState({
                    [name]:date
                })
            }
          } catch ({code, message}) {
            console.warn('Cannot open date picker', message);
          }
      }
     
    render() {
        const {errors} = this.state;
        const backgroundcolor=Object.keys(errors).length >0 || this.state.name =="" || this.state.dob =="" || this.state.gender ==""? 'rgb(229, 229, 229)' : '#0066B3';
        const textcolor=Object.keys(errors).length >0 || this.state.name =="" || this.state.dob =="" || this.state.gender ==""? '#9D9FA2' : '#ffffff';
        
       
        return <Root>
            <Container style={[Style.bgPureWhite,{margin:0}]}>
            <Header androidStatusBarColor={'#0e1130'} style={[styles.header]}>
					<Left style={styles.left}>
						<TouchableOpacity
							style={styles.backArrow}
							onPress={()=>this.props.navigation.push('HomeScreen')}>
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
                    <Content style={[Style.layoutInner,]}>
                    <View style={[styles.listItem,{paddingHorizontal:10}]}>
                        <Text style={styles.sHeader}>{"Basic information"}</Text>
                    </View>
                    <View style={{paddingHorizontal:10}}>
                   
                    <TextField
                            label={"Name"}
                            value={this.state.name}
                            onChangeText={ (name) => {
                                const validate=onlyletters.test(name);
                                if(!validate &&name !=''){
                                errors['name']="Enter a Valid Name";
                                this.setState({errors})
                                }else{
                                delete errors['name']
                                }
                                this.setState({ name }) }}
                                error={errors.name}
                        />
                        <TextField
                            label={"Age"}
                            value={this.state.dob}
                            keyboardType="number-pad"
                            maxLength={3}
                            onChangeText={ (dob) => {
                                const validate=onlynumbers.test(dob);
                                if(!validate &&dob !=''){
                                errors['dob']="Enter a Valid Age";
                                this.setState({errors})
                                }else{
                                delete errors['dob']
                                }
                                this.setState({ dob }) }}
                                error={errors.age}
                        />
                        <Dropdown
                            data={[{value:'Male'},{value:'Female'},{value:'Other'}]}
                            label={"Gender"}
                            value={this.state.gender}
                            onChangeText={ (gender) => this.setState({ gender }) }
                        />
                         <TextField
                            label={"Father / Husband Name"}
                            value={this.state.fatherName}
                            onChangeText={ (fatherName) => {
                                const validate=onlyletters.test(fatherName);
                                if(!validate &&fatherName !=''){
                                errors['fatherName']="Enter a Valid Name";
                                this.setState({errors})
                                }else{
                                delete errors['fatherName']
                                }
                                this.setState({ fatherName }) }}
                                error={errors.fatherName}
                        />
                        <TextField
                            label={"Adhaar NO"}
                            value={this.state.aadhaarNO}
                            onChangeText={ (aadhaarNO) => {
                                const validate=adhaarCheck.test(aadhaarNO);
                                if(!validate &&aadhaarNO !=''){
                                errors['aadhaarNO']="Enter a Valid Adhaar NO";
                                this.setState({errors})
                                }else{
                                delete errors['aadhaarNO']
                                }
                                this.setState({ aadhaarNO }) }}
                                error={errors.aadhaarNO}
                        />
                         <TextField
                            label={"Voter ID NO"}
                            value={this.state.voterID}
                            onChangeText={ (voterID) => {
                                const validate=voterCheck.test(voterID);
                                if(!validate &&voterID !=''){
                                errors['voterID']="Enter a Valid Voter ID NO";
                                this.setState({errors})
                                }else{
                                delete errors['voterID']
                                }
                                this.setState({ voterID }) }}
                                error={errors.voterID}
                            error={errors.voterID}
                        />
                         <TextField
                            label={"Mobile No"}
                            value={this.state.mobile}
                            keyboardType="number-pad"
                            maxLength={10}
                            onChangeText={ (mobile) => {
                                const validate=mobilenumber.test(mobile);
                                if(!validate &&mobile !=''){
                                errors['mobile']="Enter a Valid Mobile NO";
                                this.setState({errors})
                                }else{
                                delete errors['mobile']
                                }
                                this.setState({ mobile }) }}
                                error={errors.mobile}
                        />
                    </View>
                    <View style={[styles.listItem,{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:10}]}>
                        <Text style={styles.sHeader}>{"Address Information"}</Text>
                        <TouchableOpacity onPress={this.getAddress}><Text style={[styles.sHeader,{textDecorationLine:'underline'}]}>Sync Previous Address</Text></TouchableOpacity>
                    </View>
                    <View style={{paddingHorizontal:10}}>
                        <TextField
                            label={"Door NO"}
                            onChangeText={ (doorNo) => {
                                this.setState({ doorNo }) }}
                            value={this.state.doorNo}
                            error={errors.doorNo}
                        />
                         <TextField
                            label={"Street"}
                            value={this.state.street}
                            onChangeText={ (street) => {
                                this.setState({ street }) }}
                            error={errors.street}
                        />
                        <TextField
                            label={"Area"}
                            value={this.state.area}
                            onChangeText={ (area) => {
                                this.setState({ area }) }}
                            error={errors.area}
                        />
                         <TextField
                            label={"District"}
                            value={this.state.district}
                            onChangeText={ (district) => {
                                this.setState({ district }) }}
                            error={errors.district}
                        />
                         <TextField
                            label={"Pincode"}
                            value={this.state.pinCode}
                            keyboardType="number-pad"
                            maxLength={6}
                            onChangeText={ (pinCode) => {
                                const validate=pincode.test(pinCode);
                                if(!validate &&pinCode !=''){
                                errors['pinCode']="Enter a Valid Pincode";
                                this.setState({errors})
                                }else{
                                delete errors['pinCode']
                                }
                                this.setState({ pinCode }) }}
                                error={errors.pinCode}
                        />
                         <TextField
                            label={"State"}
                            value={this.state.state}
                            disabled={true}
                        />
                        {/* <TextField
                            label={"Since Living Here"}
                            value={this.state.livingHere}
                            onChangeText={ (livingHere) => {
                                this.setState({ livingHere }) }}
                            error={errors.livingHere}
                        /> */}
                        <TouchableOpacity onPress={(value)=>this.dateChange('livingHere',value)} >             
                            <Text style={{color:'rgb(150,150,150)',fontSize:12,marginTop:20}}>{this.state.livingHere!='' ? "Living here since" :null}</Text> 
                                <View style={[{borderBottomWidth:2,marginTop:5},errors.livingHere ? {borderColor:'#E11E26'}:{borderColor: 'rgb(204, 204,204)'}]}>    
                                    <Text style={{color:'rgb(150,150,150)',fontSize:16}}>{this.state.livingHere ==='' ? "Living here since" :this.state.livingHere}</Text>
                                </View>
                                
                        </TouchableOpacity>
                        <TextField
                            label={"Police Station Jursidiction"}
                            value={this.state.police}
                            onChangeText={ (police) => {
                                this.setState({ police }) }}
                            error={errors.police}
                        />

                    </View>
				  </Content>
                  <Footer>
                  <TouchableOpacity
                        disabled={Object.keys(errors).length >0 || this.state.name =='' || this.state.dob =='' ||this.state.gender =='' ? true : false}
                        //activeOpacity={this.state.userName !='' || this.state.password !='' ? 1 : 0.2}
                        style={[styles.btnSec,{backgroundColor:backgroundcolor}]}
                        onPress={this.onSubmit}
                    >
                        <Text autoCapitalize="words" style={[styles.buttontext,{color:textcolor}]}>
                        Next
                        </Text>
          </TouchableOpacity>
                  </Footer>
        </Container>
  </Root>
    }
}
CreateSurvey.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth:PropTypes.object.isRequired,
}
  
const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
});

  
export default connect(mapStateToProps,{logoutUser})(CreateSurvey)