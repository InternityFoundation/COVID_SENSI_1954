const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
//Load input Validation
const validatePoliceStationInput = require('../../validation/PoliceStation/PoliceStationValidation');
const validateStationLoginInput = require('../../validation/PoliceStation/login');

//Load PoliceStation Model
const PoliceStation = require('../../models/PoliceStation');


// @route GET  api/policestation/test
// @desc  Test PoliceStation route
// @access public
router.get('/test',(req,res)=> res.json({msg: "PoliceStation Works!!"}));

// @route GET  api/policestation/
// @desc  Get All policestation
// @access Private
router.get('/',passport.authenticate('jwt',{session:false}),(req,res) => {
    PoliceStation.aggregate([
        {
           $lookup:{
                from:"locations",
                foreignField:"_id",
                localField:"locationID",
                as:"location"
           }
        },
        {
           $unwind:"$location"
        },
    ])
    .then(policestation => {
        if(!policestation){
            errors.policestation = 'PoliceStation  Not Found';
            return res.status(404).json(errors);
        }
        res.json(policestation);
    })
    .catch(err=> res.status(404).json({error:"PoliceStation Not Found"}));
});



// @route POST  api/policestation/
// @desc  Create policestation data
// @access Private
router.post('/',passport.authenticate('jwt',{session:false}),(req,res)=>{
    const {errors, isValid} = validatePoliceStationInput(req.body);
    //Check Validation
    if(!isValid){
        //if Any errors, send 400 with errors object
        return res.status(400).json(errors);
    }
    const insertdata = {
        stationName   :   req.body.stationName,
        userName :   req.body.userName,
        password :   req.body.password,
        locationID :   req.body.locationID,
    };

    PoliceStation.findOne({userName:req.body.userName})
     .then(result=>{
        if(result){
            errors.stationName = 'UserName Already Exists';
            return res.status(404).json(errors);
        }
        else{
            new PoliceStation(insertdata).save().then(policestation=>res.json(policestation));
        }

    });
});

// @route GET  api/policestation/delete
// @desc  Delete policestation by id
// @access private
router.post('/delete',passport.authenticate('jwt',{session:false}),(req,res) => {
    PoliceStation.remove({_id:req.body.id})
    .then(policestation => {
        if(!policestation){
            errors.policestation = 'PoliceStation not found to delete';
            return res.status(404).json(errors);
        }
        res.json(policestation);
    })
    .catch(err=> res.status(404).json({error:"PoliceStation Not Found"}));
});

// @route GET  api/policestation/edit
// @desc  Edit policestation by id
// @access private
router.post('/edit',passport.authenticate('jwt',{session:false}),(req,res) => {

    const {errors, isValid} = validatePoliceStationInput(req.body);
    //Check Validation
    if(!isValid){
        //if Any errors, send 400 with errors object
        return res.status(400).json(errors);
    }

    const editdata = {
        stationName   :   req.body.stationName,
        userName :   req.body.userName,
        password :   req.body.password,
        locationID :   req.body.locationID,
    };
  
    PoliceStation.findOneAndUpdate({_id:req.body._id},{$set: editdata},{new: true})
    .then(policestation => {
        if(!policestation){
            errors.policestation = 'policestation not found';
            return res.status(404).json(errors);
        }
        res.json(policestation);
    })
    .catch(err=> res.status(404).json({error:"PoliceStation Not Found"}));
        
});

router.post('/login',(req,res)=>{
    const {errors,isValid}= validateStationLoginInput(req.body);
    // Check Validation
     if(!isValid){
        return res.status(400).json(errors);
    }
 
     const userName = req.body.userName;
     const password = req.body.password;
 
     //Find the user by email
     PoliceStation.findOne({userName})
         .then(admin=>{
             //Check for user
             if(!admin){
                 errors.userName = 'User Not Found';
                 return res.status(404).json(errors);
             }
      if(password===admin.password){
         const payload = {id: admin.id,stationName:admin.stationName,userName:admin.userName,locationID:admin.locationID,userType:'station'};//Create JWT Payload
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

module.exports = router;
