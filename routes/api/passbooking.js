const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const mongoose = require('mongoose');
//Load input Validation
const validatePassBookingInput = require('../../validation/PassBooking/PassBookingValidation');

//Load PassBooking Model
const PassBooking = require('../../models/PassBooking');


// @route GET  api/passbooking/test
// @desc  Test PassBooking route
// @access public
router.get('/test',(req,res)=> res.json({msg: "PassBooking Works!!"}));

// @route GET  api/passbooking/
// @desc  Get All passbooking
// @access Private
router.get('/',passport.authenticate('jwt',{session:false}),(req,res) => {
    PassBooking.aggregate([
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
        {
            $lookup:{
                 from:"users",
                 foreignField:"_id",
                 localField:"userID",
                 as:"user"
            }
         },
         {
            $unwind:"$user"
         },
    ])
    .then(passbooking => {
        if(!passbooking){
            errors.passbooking = 'PassBooking  Not Found';
            return res.status(404).json(errors);
        }
        res.json(passbooking);
    })
    .catch(err=> res.status(404).json({error:"PassBooking Not Found"}));
});


router.post('/viewqr',(req,res) => {
    PassBooking.aggregate([
        { $match : {_id:mongoose.Types.ObjectId(req.body.id)}},
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
        {
            $lookup:{
                 from:"users",
                 foreignField:"_id",
                 localField:"userID",
                 as:"user"
            }
         },
         {
            $unwind:"$user"
         },
    ])
    .then(passbooking => {
        if(!passbooking){
            errors.passbooking = 'PassBooking  Not Found';
            return res.status(404).json(errors);
        }
        res.json(passbooking);
    })
    .catch(err=> res.status(404).json({error:"PassBooking Not Found"}));
});

router.get('/getuser',passport.authenticate('jwt',{session:false}),(req,res) => {
    PassBooking.aggregate([
        { $match : {userID:mongoose.Types.ObjectId(req.user.id)}},
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
        {
            $lookup:{
                 from:"users",
                 foreignField:"_id",
                 localField:"userID",
                 as:"user"
            }
         },
         {
            $unwind:"$user"
         },
    ])
    .then(passbooking => {
        if(!passbooking){
            errors.passbooking = 'PassBooking  Not Found';
            return res.status(404).json(errors);
        }
        res.json(passbooking);
    })
    .catch(err=> res.status(404).json({error:"PassBooking Not Found"}));
});


router.get('/bystationwise',passport.authenticate('jwt',{session:false}),(req,res) => {
    PassBooking.aggregate([
        { $match : {locationID:mongoose.Types.ObjectId(req.user.locationID)} },
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
        {
            $lookup:{
                 from:"users",
                 foreignField:"_id",
                 localField:"userID",
                 as:"user"
            }
         },
         {
            $unwind:"$user"
         },
    ])
    .then(passbooking => {
        if(!passbooking){
            errors.passbooking = 'PassBooking  Not Found';
            return res.status(404).json(errors);
        }
        res.json(passbooking);
    })
    .catch(err=> res.status(404).json({error:"PassBooking Not Found"}));
});
// @route POST  api/passbooking/
// @desc  Create passbooking data
// @access Private
router.post('/',passport.authenticate('jwt',{session:false}),(req,res)=>{
    const {errors, isValid} = validatePassBookingInput(req.body);
    //Check Validation
    if(!isValid){
        //if Any errors, send 400 with errors object
        return res.status(400).json(errors);
    }
    const insertdata = {
        userID   :   req.user.id,
        locationID :   req.user.locationID,
        purpose :   req.body.purpose,
        selectedDate :   req.body.date,
        destination :   req.body.destination,
        timeAlotted : '-',
        startTime :   req.body.startTime,
        endTime :   req.body.endTime,
        travelMode :   req.body.travelMode,
        vehicleNo :   req.body.vehicleNo,
        status :   req.body.status,

    };
   new PassBooking(insertdata).save().then(passbooking=>res.json(passbooking));
});

// @route GET  api/passbooking/delete
// @desc  Delete passbooking by id
// @access private
router.post('/delete',passport.authenticate('jwt',{session:false}),(req,res) => {
    PassBooking.remove({_id:req.body.id})
    .then(passbooking => {
        if(!passbooking){
            errors.passbooking = 'PassBooking not found to delete';
            return res.status(404).json(errors);
        }
        res.json(passbooking);
    })
    .catch(err=> res.status(404).json({error:"PassBooking Not Found"}));
});

// @route GET  api/passbooking/edit
// @desc  Edit passbooking by id
// @access private
// router.post('/edit',passport.authenticate('jwt',{session:false}),(req,res) => {

//     const {errors, isValid} = validatePassBookingInput(req.body);
//     //Check Validation
//     if(!isValid){
//         //if Any errors, send 400 with errors object
//         return res.status(400).json(errors);
//     }

//     const editdata = {
//         userID   :   req.body.userID,
//         locationID :   req.body.locationID,
//         purpose :   req.body.purpose,
//         date :   req.body.date,
//         destination :   req.body.destination,
//         timeAlotted :   req.body.timeAlotted,
//         startTime :   req.body.startTime,
//         endTime :   req.body.endTime,
//         travelMode :   req.body.travelMode,
//         vehicleNo :   req.body.vehicleNo,
//     };
  
//     PassBooking.findOneAndUpdate({_id:req.body._id},{$set: editdata},{new: true})
//     .then(passbooking => {
//         if(!passbooking){
//             errors.passbooking = 'passbooking not found';
//             return res.status(404).json(errors);
//         }
//         res.json(passbooking);
//     })
//     .catch(err=> res.status(404).json({error:"PassBooking Not Found"}));
        
// });

router.post('/edit',passport.authenticate('jwt',{session:false}),(req,res) => {

    // const {errors, isValid} = validatePassBookingInput(req.body);
    // //Check Validation
    // if(!isValid){
    //     //if Any errors, send 400 with errors object
    //     return res.status(400).json(errors);
    // }

    // const editdata = {
    //     userID   :   req.body.userID,
    //     locationID :   req.body.locationID,
    //     purpose :   req.body.purpose,
    //     date :   req.body.date,
    //     destination :   req.body.destination,
    //     timeAlotted :   req.body.timeAlotted,
    //     startTime :   req.body.startTime,
    //     endTime :   req.body.endTime,
    //     travelMode :   req.body.travelMode,
    //     vehicleNo :   req.body.vehicleNo,
    // };
    const editdata = {
        status:req.body.status,
        timeAlotted:req.body.timeAlotted
    }
  
    PassBooking.findOneAndUpdate({_id:req.body._id},{$set: editdata},{new: true})
    .then(passbooking => {
        if(!passbooking){
            errors.passbooking = 'passbooking not found';
            return res.status(404).json(errors);
        }
        res.json(passbooking);
    })
    .catch(err=> res.status(404).json({error:"PassBooking Not Found"}));
        
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
     User.findOne({userName})
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
