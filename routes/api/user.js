const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');
const SendOtp = require('sendotp');
const sendOtp = new SendOtp('300845A7TKEiXM5db2e078', 'Covid App Track {{otp}} for Login');
const otpRegister = new SendOtp('300845A7TKEiXM5db2e078', 'Covid App Track OTP for your account {{otp}}');
//Load input Validation
const validateUserLoginInput    = require('../../validation/User/login');
const validateUserInput    = require('../../validation/User/UserValidation');






//Load User Model
const User = require('../../models/User');
require('dotenv').load();

// @route GET  api/users/test
// @desc  Test users route
// @access public
router.get('/test',(req,res)=> res.json({msg: "User Works!!"}));

// @route GET  api/user/login
// @desc  Login user returning JWT token
// @access public
router.get('/',(req,res)=>{
    User.find()
    .then(user=>{
        res.json(user)
    });
})

router.get('/getuser',passport.authenticate('jwt',{session:false}),(req,res)=> {
    User.findOne({_id:req.user.id})
    .then(user=>{
        res.json(user)
    })
    .catch(errors=>  res.status(404).json(errors))
});

router.post('/updateProfile',passport.authenticate('jwt',{session:false}),(req,res)=> {

    User.findOneAndUpdate({_id:req.body._id},{$set: req.body},{new: true})
    .then(user => {
        res.json(user);
        console.log("user",user)
    })
    .catch(err=> res.status(404).json({error:"User Not Found"}));
});
router.post('/login',(req,res)=>{
    const errors={};
     //Find the user by email
     User.findOne({mobile:req.body.mobile})
     .then(user=>{
             //Check for user
             if(!user){
                  errors.mobile ='User Not Found'
            	  return res.status(400).json(errors);
             }else{
                 const payload = { id: user.id,
					name: req.body.name,
					mobile: user.mobile,
					gender: user.gender,
					aadhaarNO: user.aadhaarNO,
					dob: user.dob,
					panNO: user.panNO,
					rationCardNO: user.rationCardNO,
					address: user.address,
					state: user.state,
					city: user.city,
					locationID: user.locationID,
					familyMember: user.familyMember,
					lat: user.lat,
					lng: user.lng,
					userType:'user'};//Create JWT Payload//Create JWT Payload
otpRegister.send(req.body.mobile, "COVTRA", function (error, data) {
        console.log(data); // data object with keys 'message' and 'type'
     if(data.type == 'success') {
       //Sign Token
                 jwt.sign(payload,keys.secretOrKey,(err,token)=>{
                    res.json({
                        success:true,
                        token:'Bearer ' + token,
                        payload:payload
                    })
                })
     }

});
                
             }
         
     });
 });
 

// @route GET  api/admin/current
// @desc  Return current User user
// @access Private
router.get('/current',passport.authenticate('jwt',{session:false}),(req,res)=>{
    res.json({
        id: req.user.id,
        name:req.user.name,
        email:req.user.email,
        userType:req.user.userType
    });
});


// @route GET  api/user/register
// @desc  Register user route
// @access public
router.post('/register',(req,res)=>{
   const errors={};
      User.findOne({mobile:req.body.mobile})
      .then(user => {
          if(user){
            errors.mobile ='Mobile No Already Exists'
            return res.status(400).json(errors);
          }
          else{
            const newUser = new User({
                name: req.body.name,
                mobile: req.body.mobile,
		gender: req.body.gender,
		aadhaarNO: req.body.aadhaarNO,
		dob: req.body.dob,
                panNO: req.body.panNO,
		rationCardNO: req.body.rationCardNO,
		address: req.body.address,
		state: req.body.state,
		city: req.body.city,
		locationID: req.body.locationID,
		familyMember: req.body.familyMember,
		lat: req.body.lat,
                lng: req.body.lng,
            });  
            newUser.save()
                 .then(user => {
                     //res.json(user)
                      //User matched
                      const payload = { id: user.id,
					name: req.body.name,
					mobile: user.mobile,
					gender: user.gender,
					aadhaarNO: user.aadhaarNO,
					dob: user.dob,
					panNO: user.panNO,
					rationCardNO: user.rationCardNO,
					address: user.address,
					state: user.state,
					city: user.city,
					locationID: user.locationID,
					familyMember: user.familyMember,
					lat: user.lat,
					lng: user.lng,
					userType:'user'};//Create JWT Payload
                      //Sign Token
                      jwt.sign(payload,keys.secretOrKey,(err,token)=>{
                          res.json({
                              success:true,
                              token:'Bearer ' + token
                          })
                      });
                  
                  })
                 .catch(err => console.log(err));
           
         }
      })
  });


 
  
  // @route GET  api/user/delete
  // @desc  Delete user by id
  // @access private
  router.post('/delete',passport.authenticate('jwt',{session:false}),(req,res) => {
      User.remove({_id:req.body.id})
      .then(user => {
          if(!user){
              errors.user = 'User not found to delete';
              return res.status(404).json(errors);
          }
          res.json(user);
      })
      .catch(err=> res.status(404).json({error:"User Not Found"}));
  });
  
  // @route GET  api/user/edit
  // @desc  Edit user by id
  // @access private
  router.post('/edit',passport.authenticate('jwt',{session:false}),(req,res) => {
  
      const {errors, isValid} = validateUserInput(req.body);
      //Check Validation
      if(!isValid){
          //if Any errors, send 400 with errors object
          return res.status(400).json(errors);
      }
  
      const editdata = {
        userID   :   req.body.userID,
        userName :   req.body.userName,
        password :   req.body.password,
      };
    
      User.findOneAndUpdate({_id:req.body._id},{$set: editdata},{new: true})
      .then(user => {
          if(!user){
              errors.user = 'user not found';
              return res.status(404).json(errors);
          }
          res.json(user);
      })
      .catch(err=> res.status(404).json({error:"User Not Found"}));
          
  });


router.post('/newUserSendOtp',(req,res)=>{
   const errors={}
    //Find the user by email
    User.findOne({$and:[{mobile:req.body.mobileNumber},{status:"active"}]})
        .then(user=>{
            //Check for user
            if(user){
                errors.error = 'Mobile No Already Exists';
                return res.status(400).json(errors);
            }

            otpRegister.send(req.body.mobileNumber, "COVTRA", function (error, data) {
                console.log(data); // data object with keys 'message' and 'type'
             if(data.type == 'success') {
               res.json(data);
             }

        });
    });
});

router.post('/resendOtp',(req,res)=>{
    const errors={}
    otpRegister.send(req.body.mobile, "COVTRA", function (error, data) {
        console.log(data); // data object with keys 'message' and 'type'
     if(data.type == 'success') {
       res.json(data);
     }

});
 });

router.post('/newUserVerifyOtp',(req,res)=>{
    const errors={}
    const mobileno=req.body.mobileNumber;
    const otpNo =req.body.otpNo;
     //Find the user by email
     sendOtp.verify(mobileno, otpNo, function (error, data) {
        if(data.type == 'success'){
           res.json(data)
        }else{
            res.json(error)
        }
    });
 });

 router.post('/verifyOtp',passport.authenticate('jwt',{session:false}),(req,res)=>{
    const errors={}
console.log("user",req.user.mobile);
    const mobileno=req.user.mobile;
    const otpNo =req.body.otp;
     //Find the user by email
     sendOtp.verify(mobileno, otpNo, function (error, data) {
        if(data.type == 'success'){
           res.json(data)
        }else{
            res.status(400).json(error)
        }
    });
 });

module.exports = router;
