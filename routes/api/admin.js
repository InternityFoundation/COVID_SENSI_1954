const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');
const mongoose = require('mongoose');
const SendOtp = require('sendotp');
// replace your OTP API Key below
const sendOtp = new SendOtp('228864ASB93U4Nk5bsafsdf', 'OTP for your account {{otp}}');
const axios = require('axios');

//Load input Validation
const validateAdminRegisterInput = require('../../validation/Admin/register');
const validateAdminLoginInput    = require('../../validation/Admin/login');
const validateAdminUpdateInput    = require('../../validation/Admin/updatepassword');
const validateAdminForgetInput    = require('../../validation/Admin/forget');

//Load Admin Model
const Admin = require('../../models/Admin');
const User = require('../../models/User');
const PassBooking = require('../../models/PassBooking');
const PoliceStation = require('../../models/PoliceStation');



require('dotenv').load();

// @route GET  api/admin/test
// @desc  Test users route
// @access public
router.get('/test',(req,res)=> res.json({msg: "Admin Works!!"}));


// @route GET  api/user/register
// @desc  Register Admin route
// @access public
router.post('/register',(req,res)=>{
    const {errors,isValid}= validateAdminRegisterInput(req.body);

    //Check Validation
    if(!isValid){
        return res.status(400).json(errors);
    }

    Admin.findOne({email:req.body.email})
    .then(admin => {
        if(admin){
          errors.email = 'Email Already Exists';
          return res.status(400).json(errors);
        }
        else{
          const newAdmin = new Admin({
              email: req.body.email,
              name: req.body.name,
              password: req.body.password,
              userType:'admin'
          });
          bcrypt.genSalt(10,(err,salt)=>{
            bcrypt.hash(newAdmin.password,salt,(err,hash) => {
              if(err) throw err;
              newAdmin.password = hash;
              newAdmin.save()
               .then(admin => {
                const payload = {id: admin.id,name:admin.name,email:admin.email,userType:'admin',mobile:admin.mobile};//Create JWT Payload
                    //Sign Token
                    jwt.sign(payload,keys.secretOrKey,{expiresIn:3600},(err,token)=>{
                        res.json({
                            success:true,
                            token:'Bearer ' + token
                        })
                    });
               })
               .catch(err => console.log(err));
            })
          })

        }
    })
});

// @route GET  api/admin/login
// @desc  Login user returning JWT token
// @access public
router.post('/login',(req,res)=>{
    const {errors,isValid}= validateAdminLoginInput(req.body);
    //Check Validation
    if(!isValid){
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    //Find the user by email
    Admin.findOne({email})
        .then(admin=>{
            //Check for user
            if(!admin){
                errors.email = 'User Not Found';
                return res.status(404).json(errors);
            }
            //Check password
            bcrypt.compare(password,admin.password)
                  .then(isMatch =>{
                      if(isMatch){
                        //User matched
                        const payload = {id: admin.id,name:admin.name,email:admin.email,userType:'admin',mobile:admin.mobile};//Create JWT Payload
                        //Sign Token
                        jwt.sign(payload,keys.secretOrKey,(err,token)=>{
                            res.json({
                                success:true,
                                token:'Bearer ' + token,
                                payload:payload
                            })
                        });
                      }else{
                        errors.password = 'Password Incorrect';
                        return res.status(400).json(errors);
                      }
                  });
        });
});

// @route GET  api/admin/current
// @desc  Return current Admin user
// @access Private
router.get('/current',passport.authenticate('jwt',{session:false}),(req,res)=>{
    res.json({
        id: req.user.id,
        name:req.user.name,
        email:req.user.email,
        userType:req.user.userType
    });
});
//update password

router.post('/update',passport.authenticate('jwt',{session:false}),(req,res)=>{

    const {errors,isValid}= validateAdminUpdateInput(req.body);
    //Check Validation
    if(!isValid){
        return res.status(400).json(errors);
    }
    
    bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(req.body.password,salt,(err,hash) => {
          if(err) throw err;
          newpassword = hash;
          Admin.findByIdAndUpdate(req.user.id,{password:newpassword})
           .then(user => res.json(user))
           .catch(err => console.log(err));
        })
      })
});


//forgot password
router.post('/forgot',(req,res)=>{
    const {errors,isValid}= validateAdminForgetInput(req.body);

    //Check Validation
    if(!isValid){
        return res.status(400).json(errors);
    }

    var secval = Math.floor(1000 + Math.random() * 9000);
    const newUser = new Admin({
     password: secval,
     mobile:req.body.mobile
    });

    const mobileno = req.body.mobile;
    Admin.findOne({mobile:mobileno})
        .then(user=>{
                //Check for admin user
            if(!user){
                errors.mobile = 'Mobile Number not found';
                return res.status(404).json(errors);
        }
     sendOtp.send(req.body.mobile, "Manjap", secval, function (error, data){
        if(data.type == 'success')
        {
            bcrypt.genSalt(10,(err,salt)=>{
                bcrypt.hash(newUser.password,salt,(err,hash) => {
                    console.log("newuser password",newUser.password)
                  if(err) throw err;
                  newpassword = hash;
                  User.findOneAndUpdate({mobile:newUser.mobile}, { $set: {password: newpassword}})
                   .then(user => res.json(user))
                   .catch(err => console.log(err));
                })
              })
        }else{
            if(data.type == 'error') {
                return res.status(404).json(error);
            }
        }
        return data;        
    });
});


});

router.get('/dashboard',(req,res)=>{
    Promise.all([
        Admin.countDocuments().exec(),
        User.countDocuments().exec(),
        PassBooking.countDocuments().exec(),
        PoliceStation.countDocuments().exec(),
        Location.countDocuments().exec(),
      ]).then(function(counts) {
            res.json({
                user:counts[1],
                passbooking:counts[2],
                policestation:counts[3],
                location:counts[4],
            })

      });
});
module.exports = router;
