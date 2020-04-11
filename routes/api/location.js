const express = require('express');
const router = express.Router();
const passport = require('passport');

//Load input Validation
const validateLocationInput = require('../../validation/Location/LocationValidation');

//Load Location Model
const Location = require('../../models/Location');


// @route GET  api/location/test
// @desc  Test Location route
// @access public
router.get('/test',(req,res)=> res.json({msg: "Location Works!!"}));

// @route GET  api/location/
// @desc  Get All location
// @access Private
router.get('/',passport.authenticate('jwt',{session:false}),(req,res) => {
    Location.find()
    .then(location => {
        if(!location){
            errors.location = 'Location Name Not Found';
            return res.status(404).json(errors);
        }
        res.json(location);
    })
    .catch(err=> res.status(404).json({error:"Location Not Found"}));
});

router.get('/getlocation',(req,res) => {
    Location.find()
    .then(location => {
        if(!location){
            errors.location = 'Location Name Not Found';
            return res.status(404).json(errors);
        }
        res.json(location);
    })
    .catch(err=> res.status(404).json({error:"Location Not Found"}));
});
// @route POST  api/location/
// @desc  Create location data
// @access Private
router.post('/',passport.authenticate('jwt',{session:false}),(req,res)=>{
   // res.json({msg: "Location Works!!"})
    const {errors, isValid} = validateLocationInput(req.body);
    //Check Validation
    if(!isValid){
        //if Any errors, send 400 with errors object
        return res.status(400).json(errors);
    }
    const insertdata = {
        areaCode   :   req.body.areaCode,
        areaName :   req.body.areaName,
        city :   req.body.city,
        state :   req.body.state, 
    };

    Location.findOne({areaCode:req.body.areaCode})
     .then(result=>{
        if(result){
            errors.name = 'Location Already Exists';
            return res.status(404).json(errors);
        }
        else{
            new Location(insertdata).save().then(location=>res.json(location));
        }

    });
});

// @route GET  api/location/delete
// @desc  Delete location by id
// @access private
router.post('/delete',passport.authenticate('jwt',{session:false}),(req,res) => {
    Location.remove({_id:req.body.id})
    .then(location => {
        if(!location){
            errors.location = 'Location not found to delete';
            return res.status(404).json(errors);
        }
        res.json(location);
    })
    .catch(err=> res.status(404).json({error:"Location Not Found"}));
});

// @route GET  api/location/edit
// @desc  Edit location by id
// @access private
router.post('/edit',passport.authenticate('jwt',{session:false}),(req,res) => {

    const {errors, isValid} = validateLocationInput(req.body);
    //Check Validation
    if(!isValid){
        //if Any errors, send 400 with errors object
        return res.status(400).json(errors);
    }

    const editdata = {
        areaCode   :   req.body.areaCode,
        areaName :   req.body.areaName,
        city :   req.body.city,
        state :   req.body.state,   
    };
  
    Location.findOneAndUpdate({_id:req.body._id},{$set: editdata},{new: true})
    .then(location => {
        if(!location){
            errors.location = 'location not found';
            return res.status(404).json(errors);
        }
        res.json(location);
    })
    .catch(err=> res.status(404).json({error:"Location Not Found"}));
        
});

module.exports = router;
