import React from 'react'
import {Alert,I18nManager,BackHandler,DatePickerAndroid, ListView,NetInfo,StatusBar,PermissionsAndroid, TouchableOpacity, TextInput, StyleSheet, Image, ImageBackground, Dimensions, ScrollView, Platform, SafeAreaView, FlatList, ToolbarAndroid } from 'react-native'
import {Root, Container, Header, Content, Button, Icon, Text, Title, Left, Right, Body, Input, Item, Footer, View, FooterTab, Badge,Toast } from 'native-base'
import Style from '@Theme/Style';
import styles from '@Screen/QuestionList/Style';
import axios from 'axios';
import {logoutUser} from "@Action/authAction";
import {API_URL,pincode,onlyletters,onlynumbers,numberwithdot,
    letterswithdot,floatnumbers,
    mobilenumber,email} from "@Action/constant";
//action declareation
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { TextField } from 'react-native-material-textfield';
import { Dropdown } from 'react-native-material-dropdown';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
import FontAwesome from 'react-native-vector-icons/FontAwesome';

class QuestionList extends React.Component {
    constructor(){
        super()
        this.state={
            result:[],
            arrayindex:0,
            totalindex:13,
            resultLength:null,
            btnEnable:false,
            basicData:{},
            errors:{},
            resultArray:[
            {
                question:"Fever",
                answer:"",
                type:"text",
                typeval:"",
                since:'',
                medication:''
            },
            {
                question:"Dry Cough",
                answer:"",
                type:"option",
                typeval:"",
                since:null,
                medication:null
            },
            {
                question:"Stuffy Nose",
                answer:"",
                type:"option",
                typeval:"",
                since:"",
                medication:""
            },
            {
                question:"Sore Throat",
                answer:"",
                type:"option",
                typeval:"",
                since:"",
                medication:""
            },
            {
                question:"Shortness of breath",
                answer:"",
                type:"option",
                typeval:"",
                since:"",
                medication:""
            },
            {
                question:"Headache",
                answer:"",
                type:"option",
                typeval:"",
                since:"",
                medication:""
            },
            {
                question:"Body ache",
                answer:"",
                type:"option",
                typeval:"",
                since:"",
                medication:""
            },
            {
                question:"Sneezing",
                answer:"",
                type:"option",
                typeval:"",
                since:"",
                medication:""
            },
            {
                question:"Exhaustion",
                answer:"",
                type:"option",
                typeval:"",
                since:"",
                medication:""
            },
            {
                question:"Diarrhea",
                answer:"",
                type:"option",
                typeval:"",
                since:"",
                medication:""
            },
            {
                question:"Are you able to smell normally?",
                answer:"",
                since:null,
                medication:null
            },
            {
                question:"Do you have any health issues?",
                answer:"",
                type:"health",
                typeval:" ",
                typevalother:"",
                since:null,
                medication:null

            },
            {
                question:"Did you consult a doctor in the last 30 days?",
                answer:"",
                type:"consult",
                typeval:"",
                since:null,
                medication:null
            },
        ],
        }
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }
    
  
    
    logout(){
        this.props.logoutUser(this.props.navigation)
    }
    onSubmit(){
    }
    updateState(){
        if(this.state.arrayindex<(this.state.totalindex-1)){
          this.setState({
            arrayindex:this.state.arrayindex+1,
          })
        }else{
            console.log("finish",this.state.resultArray) 
            this.props.navigation.push('HealthList',{
                basicData:this.state.basicData,
                questionList:this.state.resultArray
            })
        }
        
    }
    reduceState(){
        this.setState({
            arrayindex:this.state.arrayindex-1,
          })  
    }
 async handleChangeText(name,value,index){
        const temp=this.state.resultArray;
        if(name==='answer'){
            temp[index].answer=value;
        }else  if(name==='typeval'){
            temp[index].typeval=value;
        }else  if(name==='since'){
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
                  temp[index].since =day+'-'+month+'-'+year;
                    
                }
              } catch ({code, message}) {
                console.warn('Cannot open date picker', message);
              }
        }
        else  if(name==='medication'){
            temp[index].medication=value;
        }
        else  if(name==='typevalother'){
            temp[index].typevalother=value;
        }
        
        this.setState({
              resultArray:temp,
          })
    }
   
    componentDidMount() {
        PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE)
        // This is the first method in the activity lifecycle
        // Addding Event Listener for the BackPress 
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
        const { navigation } = this.props;   
        var basicdata=navigation.getParam('basicData', {});
        this.setState({
            basicData:basicdata,
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
    render() {
        const {errors,result,resultArray,arrayindex} = this.state;
        const backgroundcolor=Object.keys(errors).length >0 || this.state.name =="" || this.state.dob =="" || this.state.gender ==""? 'rgb(229, 229, 229)' : '#0066B3';
        const textcolor=Object.keys(errors).length >0 || this.state.name =="" || this.state.dob =="" || this.state.gender ==""? '#9D9FA2' : '#ffffff';
        var questionList;
        if(resultArray.length >0){
            console.log("data",resultArray[arrayindex].since,resultArray[arrayindex].medication)
            questionList=(<View>
                <View style={styles.listItem}>
                        <Text style={styles.sHeader}>{resultArray[arrayindex].question}</Text>
                </View>
                <View style={{paddingHorizontal:10}}>
                 <Dropdown
                        data={[{
                            value: 'Yes',
                        }, {
                            value: 'No',
                        }]}
                        label={"Select"}
                        onChangeText={ (value) => this.handleChangeText('answer',value,arrayindex) }
                        value={resultArray[arrayindex].answer}
                    />
                {resultArray[arrayindex].answer ==='Yes' && resultArray[arrayindex].type ==='option' ? <View>
                    <Dropdown
                      data={[{
                        value: 'Light',
                      }, {
                        value: 'Medium',
                      },
                      {
                        value: 'Heavy',
                      }]}
                    label={"Select Severity Level"}
                    onChangeText={ (value) => this.handleChangeText('typeval',value,arrayindex) }
                    value={resultArray[arrayindex].typeval}
                  /></View> : null}
              {resultArray[arrayindex].answer ==='Yes' && resultArray[arrayindex].type ==='text' ?
               <View style={{width:'100%'}}>
               <TextField
                   label={"Temperature"}
                   value={resultArray[arrayindex].typeval}
                   onChangeText={ (value) => this.handleChangeText('typeval',value,arrayindex) }
               />
         </View> : null}

         {resultArray[arrayindex].answer ==='Yes' && resultArray[arrayindex].type ==='health' ? <View>
                    <Dropdown
                      data={[{
                        value: 'Diabetes',
                      }, 
                      {
                        value: 'Hypertension',
                      },
                      {
                        value: 'Heart',
                      },
                      {
                        value: 'Lung',
                      },
                      {
                        value: 'Liver',
                      },
                      {
                        value: 'Pancreas',
                      },
                      {
                        value: 'Kidney',
                      },
                      {
                        value: 'Brain / Neurology',
                      },
                      {
                        value: 'Orthopedics',
                      },

                      {
                        value: 'Other',
                      },
                    ]}
                    label={"Select"}
                    onChangeText={ (value) => this.handleChangeText('typeval',value,arrayindex) }
                    value={resultArray[arrayindex].typeval}
        /></View> : null}
    {resultArray[arrayindex].answer ==='Yes' && resultArray[arrayindex].typeval ==='Other' ?
               <View style={{width:'100%'}}>
               <TextField
                   label={"Type Other"}
                   value={resultArray[arrayindex].typevalother}
                   onChangeText={ (value) => this.handleChangeText('typevalother',value,arrayindex) }
               />
         </View> : null}
          {resultArray[arrayindex].answer ==='Yes' && resultArray[arrayindex].type ==='consult' ? <View>
                    <Dropdown
                      data={[{
                        value: 'In-Patient',
                      }, {
                        value: 'Out-Patient',
                      },
                      ]}
                    label={"Select Severity Level"}
                    onChangeText={ (value) => this.handleChangeText('typeval',value,arrayindex) }
                    value={resultArray[arrayindex].typeval}
        /></View> : null}

        {resultArray[arrayindex].since !=null && resultArray[arrayindex].answer ==='Yes'   ?<View style={{width:'100%'}}>
                        {/* <TextField
                            label={"Since When"}
                            value={resultArray[arrayindex].since}
                            onChangeText={ (value) => this.handleChangeText('since',value,arrayindex) }
                        /> */}
                        <TouchableOpacity onPress={(value) => this.handleChangeText('since',value,arrayindex)} >             
                            <Text style={{color:'rgb(150,150,150)',fontSize:12,marginTop:20}}>{resultArray[arrayindex].since!='' ? "Since When" :null}</Text> 
                                <View style={[{borderBottomWidth:2,marginTop:5}]}>    
                                    <Text style={{color:'rgb(150,150,150)',fontSize:16}}>{resultArray[arrayindex].since ==='' ? "Since When" :resultArray[arrayindex].since}</Text>
                                </View>
                                
                        </TouchableOpacity>
            </View> : null}

            {resultArray[arrayindex].medication !=null && resultArray[arrayindex].answer ==='Yes'  ?<View style={{width:'100%'}}>
                <Dropdown
                      data={[{
                        value: 'Yes',
                      }, {
                        value: 'No',
                      }]}
                    label={"Are you under medication"}
                    onChangeText={ (value) => this.handleChangeText('medication',value,arrayindex) }
                    value={resultArray[arrayindex].medication}
                  />
            </View> : null}

            {resultArray[arrayindex].answer==='Yes' && resultArray[arrayindex].typeval !=='' && resultArray[arrayindex].since !=='' && resultArray[arrayindex].medication !==''? <View style={{paddingTop:20}}>
            <View style={{flexDirection:'row',justifyContent:'space-evenly'}}>
            {this.state.arrayindex > 0 ? <TouchableOpacity onPress={()=>this.reduceState()} style={{backgroundColor: '#0066B3',	justifyContent: 'center',alignItems: 'center',width:'49%'}}>
                <Text  style={{alignSelf: 'center',color:'white',fontSize:20,padding:10}}>{"Prev"}</Text>
                </TouchableOpacity> : null}
                <TouchableOpacity onPress={()=>this.updateState()} style={{backgroundColor: '#0066B3',	justifyContent: 'center',alignItems: 'center',width:this.state.arrayindex > 0 ?'49%':'100%'}}>
                <Text  style={{alignSelf: 'center',color:'white',fontSize:20,padding:10}}>{this.state.arrayindex+1 === this.state.totalindex ?"Submit" : "Next"}</Text>
                </TouchableOpacity>
            </View>
              </View> : null}
              {resultArray[arrayindex].answer==='No' ? <View style={{paddingTop:20}}>
            <View style={{flexDirection:'row',justifyContent:'space-evenly'}}>
            {this.state.arrayindex > 0 ? <TouchableOpacity onPress={()=>this.reduceState()} style={{backgroundColor: '#0066B3',	justifyContent: 'center',alignItems: 'center',width:'49%'}}>
                <Text  style={{alignSelf: 'center',color:'white',fontSize:20,padding:10}}>{"Prev"}</Text>
                </TouchableOpacity> : null}
                <TouchableOpacity onPress={()=>this.updateState()} style={{backgroundColor: '#0066B3',	justifyContent: 'center',alignItems: 'center',width:this.state.arrayindex > 0 ?'49%':'100%'}}>
                <Text  style={{alignSelf: 'center',color:'white',fontSize:20,padding:10}}>{this.state.arrayindex+1 === this.state.totalindex ?"Submit" : "Next"}</Text>
                </TouchableOpacity>
            </View>
              </View> : null}
              </View>
            </View>)
        }

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
                    {questionList}
                   
                  </Content>
        </Container>
  </Root>
    }
}
QuestionList.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth:PropTypes.object.isRequired,
}
  
const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
});

  
export default connect(mapStateToProps,{logoutUser})(QuestionList)