import React from 'react'
import {Alert,I18nManager,BackHandler,ActivityIndicator,DatePickerAndroid,ListView,NetInfo,StatusBar,PermissionsAndroid, TouchableOpacity, TextInput, StyleSheet, Image, ImageBackground, Dimensions, ScrollView, Platform, SafeAreaView, FlatList, ToolbarAndroid } from 'react-native'
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
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

class QuestionList extends React.Component {
    constructor(){
        super()
        this.state={
            result:[],
            arrayindex:0,
            totalindex:2,
            resultLength:null,
            btnEnable:false,
            basicData:{},
            questionList:{},
            errors:{},
            resultArray:[
            {
                question:"DID YOU TRAVEL ANYWHERE SINCE 01 JAN 2020",
                answer:"",
                country:"",
                place:"",
                returnDate:"",
                symptoms:'',
                condition:'',
                consult:'',
                hospitalName:'',
                type:"health",
                date:""
            },
            {
                question:"Have you attended any gatherings in the last 30 days",
                answer:"",
                place:"",
                returnDate:"",
                symptoms:'',
                condition:'',
                consult:'',
                hospitalName:'',
                type:"group",
                date:""
            },
        ],
        isLoading:false
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
            this.setState({
                isLoading:true
            })
            console.log("finish",this.state.resultArray) 
            const basicdata=this.state.basicData;
            var otherdata={
                healthList:this.state.questionList,
                travelList:this.state.resultArray,
            }
            const data = {...basicdata, ...otherdata }
            axios.post(API_URL+'/api/survey/',data)
            .then(res=>{
                this.setState({
                    isLoading:false
                })
                Alert.alert('','Successfully Saved',
                [
                  {text: 'OK', onPress: ()=>this.props.navigation.push('CreateSurvey')},
                ],
                {cancelable: false},
                );
            })
            .catch(err=>{
                this.setState({
                    isLoading:false
                })
                console.log("err",err)
                Alert.alert('','Error Occured Try Again',
                [
                  {text: 'OK', onPress: ()=>console.log("error")},
                ],
                {cancelable: false},
                );
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
            
        } else  if(name==='country'){
            temp[index].country=value;
        } else  if(name==='place'){
            temp[index].place=value;
        } else  if(name==='returnDate'){
           
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
                  temp[index].returnDate =day+'-'+month+'-'+year;
                }
              } catch ({code, message}) {
                console.warn('Cannot open date picker', message);
              }
        }
          else  if(name==='symptoms'){
            temp[index].symptoms=value;
        }
        else  if(name==='condition'){
            temp[index].condition=value;
        }
        else  if(name==='consult'){
            temp[index].consult=value;
        }
        else  if(name==='hospitalName'){
            temp[index].hospitalName=value;
        }
        else  if(name==='date'){
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
                  temp[index].date =day+'-'+month+'-'+year;
                }
              } catch ({code, message}) {
                console.warn('Cannot open date picker', message);
              }
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
        var questiondata=navigation.getParam('questionList', {});
        this.setState({
            basicData:basicdata,
            questionList:questiondata
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
                {resultArray[arrayindex].answer ==='Yes' && resultArray[arrayindex].type ==='health'? <View>
                    <Dropdown
                      data={[{
                        value: 'OUTSIDE INDIA',
                      }, {
                        value: 'INSIDE INDIA',
                      },
                      ]}
                    label={"Select"}
                    onChangeText={ (value) => this.handleChangeText('country',value,arrayindex) }
                    value={resultArray[arrayindex].country}
                  /></View> : null}
              {resultArray[arrayindex].answer ==='Yes' ?
               <View style={{width:'100%'}}>
               <TextField
                   label={"WHICH COUNTRY/CITY/PLACE"}
                   value={resultArray[arrayindex].place}
                   onChangeText={ (value) => this.handleChangeText('place',value,arrayindex) }
               />
         </View> : null}

          {resultArray[arrayindex].answer ==='Yes' && resultArray[arrayindex].type ==='health' ?
               <View style={{width:'100%'}}>
               {/* <TextField
                   label={"RETURN DATE TO HOME/INDIA"}
                   value={resultArray[arrayindex].returnDate}
                   onChangeText={ (value) => this.handleChangeText('returnDate',value,arrayindex) }
               /> */}
               <TouchableOpacity onPress={(value) => this.handleChangeText('returnDate',value,arrayindex)} >             
                            <Text style={{color:'rgb(150,150,150)',fontSize:12,marginTop:20}}>{resultArray[arrayindex].returnDate!='' ? "RETURN DATE TO HOME/INDIA" :null}</Text> 
                                <View style={[{borderBottomWidth:2,marginTop:5}]}>    
                                    <Text style={{color:'rgb(150,150,150)',fontSize:16}}>{resultArray[arrayindex].returnDate ==='' ? "RETURN DATE TO HOME/INDIA" :resultArray[arrayindex].returnDate}</Text>
                                </View>
                                
                        </TouchableOpacity>
         </View> : null}

          {resultArray[arrayindex].answer ==='Yes' && resultArray[arrayindex].type ==='group' ?
               <View style={{width:'100%'}}>
               {/* <TextField
                   label={"SPECIFY DATE"}
                   value={resultArray[arrayindex].date}
                   onChangeText={ (value) => this.handleChangeText('date',value,arrayindex) }
               /> */}
                 <TouchableOpacity onPress={(value) => this.handleChangeText('date',value,arrayindex)} >             
                            <Text style={{color:'rgb(150,150,150)',fontSize:12,marginTop:20}}>{resultArray[arrayindex].date!='' ? "SPECIFY DATE" :null}</Text> 
                                <View style={[{borderBottomWidth:2,marginTop:5}]}>    
                                    <Text style={{color:'rgb(150,150,150)',fontSize:16}}>{resultArray[arrayindex].date ==='' ? "SPECIFY DATE" :resultArray[arrayindex].date}</Text>
                                </View>
                                
                        </TouchableOpacity>
         </View> : null}


          {resultArray[arrayindex].answer ==='Yes' ?
               <View style={{width:'100%'}}>
                <Dropdown
                      data={[{
                        value: 'Yes',
                      }, {
                        value: 'No',
                      },
                      ]}
                    label={"DID YOU HAVE ANY ILL-HEALTH SYMPTOMS ON ARRIVAL TO HOME/INDIA"}
                    onChangeText={ (value) => this.handleChangeText('symptoms',value,arrayindex) }
                    value={resultArray[arrayindex].symptoms}
                  />
         </View> : null}

        
    {resultArray[arrayindex].answer ==='Yes' ?
               <View style={{width:'100%'}}>
               <TextField
                   label={"WHAT WAS THE MEDICAL CONDITION ?"}
                   value={resultArray[arrayindex].condition}
                   onChangeText={ (value) => this.handleChangeText('condition',value,arrayindex) }
               />
         </View> : null}
          {resultArray[arrayindex].answer ==='Yes'? <View>
                    <Dropdown
                      data={[{
                        value: 'Yes',
                      }, {
                        value: 'No',
                      },
                      ]}
                    label={"DID YOU CONSULT A DOCTOR"}
                    onChangeText={ (value) => this.handleChangeText('consult',value,arrayindex) }
                    value={resultArray[arrayindex].consult}
        /></View> : null}

        {resultArray[arrayindex].answer ==='Yes' &&  resultArray[arrayindex].consult==='Yes' ?<View style={{width:'100%'}}>
                        <TextField
                            label={"HOSPITAL NAME AND ADDRESS"}
                            value={resultArray[arrayindex].hospitalName}
                            onChangeText={ (value) => this.handleChangeText('hospitalName',value,arrayindex) }
                        />
            </View> : null}

            
    {!this.state.isLoading ? <View>
            {resultArray[arrayindex].answer ? <View style={{paddingTop:20}}>
            <View style={{flexDirection:'row',justifyContent:'space-evenly'}}>
            {this.state.arrayindex > 0 ? <TouchableOpacity onPress={()=>this.reduceState()} style={{backgroundColor: '#0066B3',	justifyContent: 'center',alignItems: 'center',width:'49%'}}>
                <Text  style={{alignSelf: 'center',color:'white',fontSize:20,padding:10}}>{"Prev"}</Text>
                </TouchableOpacity> : null}
                <TouchableOpacity onPress={()=>this.updateState()} style={{backgroundColor: '#0066B3',	justifyContent: 'center',alignItems: 'center',width:this.state.arrayindex > 0 ?'49%':'100%'}}>
                <Text  style={{alignSelf: 'center',color:'white',fontSize:20,padding:10}}>{this.state.arrayindex+1 === this.state.totalindex ? "Save" : "Next"}</Text>
                </TouchableOpacity>
            </View>
              </View> : null}
    </View> :<TouchableOpacity onPress={()=>this.reduceState()} style={{backgroundColor: '#0066B3',	justifyContent: 'center',alignItems: 'center'}}>
                <ActivityIndicator size="small" color="#fff"/>
                </TouchableOpacity> }

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