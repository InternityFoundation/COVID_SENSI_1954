const express = require('express');
const router = express.Router();
const passport = require('passport');
const mongoose = require('mongoose');

// //Load input Validation
// const validateSurveyInput = require('../../validation/Survey/SurveyValidation');

//Load Survey Model
const Survey = require('../../models/Survey');


// @route GET  api/survey/test
// @desc  Test Survey route
// @access public
router.get('/test',(req,res)=> res.json({msg: "Survey Works!!"}));

// @route GET  api/survey/
// @desc  Get All survey
// @access Private
router.get('/',passport.authenticate('jwt',{session:false}),(req,res) => {
    Survey.aggregate([
        { $sort: { date: -1 } },
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
    .then(survey => {
        if(!survey){
            errors.survey = 'Survey Not Found';
            return res.status(404).json(errors);
        }
        res.json(survey);
    })
    .catch(err=> res.status(404).json({error:"Survey Not Found"}));
});

router.get('/getaddress',passport.authenticate('jwt',{session:false}),(req,res) => {
	Survey.findOne({userID:req.user.id})
	.sort({date:-1})
	.limit(1)
	.then(survey=>res.json(survey))
	
})

router.get('/getsurvey',passport.authenticate('jwt',{session:false}),(req,res) => {
    Survey.aggregate([
        { $match : {userID:mongoose.Types.ObjectId(req.user.id)} },
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
    .then(survey => {
        if(!survey){
            errors.survey = 'Survey Name Not Found';
            return res.status(404).json(errors);
        }
        res.json(survey);
    })
    .catch(err=> res.status(404).json({error:"Survey Not Found"}));
});


// @route POST  api/survey/
// @desc  Create survey data
// @access Private
router.post('/',passport.authenticate('jwt',{session:false}),(req,res)=>{
   // const {errors, isValid} = validateSurveyInput(req.body);
    //Check Validation
    //if(!isValid){
        //if Any errors, send 400 with errors object
    //    return res.status(400).json(errors);
   // }
    const insertdata = {
        userID   :   req.user.id,
        name   :   req.body.name,
        dob   :   req.body.dob,
	    gender   :   req.body.gender,
	    fatherName   :   req.body.fatherName,
	    aadhaarNO   :   req.body.aadhaarNO,
        voterID   :   req.body.voterID,
	    mobile   :   req.body.mobile,       
	    doorNo   :   req.body.doorNo,
        street   :   req.body.street,
	    area   :   req.body.area,  
	    district   :   req.body.district,  
	    pinCode   :   req.body.pinCode,  
            state   :   req.body.state, 
 	    country   :   req.body.country, 
	    livingHere   :   req.body.livingHere,  
	    police   :   req.body.police,  
	    otherInfo   :   req.body.otherInfo,  
	    healthList   :  JSON.stringify(req.body.healthList),
	    travelList   :  JSON.stringify(req.body.travelList),
    };
    new Survey(insertdata).save().then(survey=>res.json(survey));
    
});

// @route GET  api/survey/delete
// @desc  Delete survey by id
// @access private
router.post('/delete',passport.authenticate('jwt',{session:false}),(req,res) => {
    Survey.remove({_id:req.body.id})
    .then(survey => {
        if(!survey){
            errors.survey = 'Survey not found to delete';
            return res.status(404).json(errors);
        }
        res.json(survey);
    })
    .catch(err=> res.status(404).json({error:"Survey Not Found"}));
});

// @route GET  api/survey/edit
// @desc  Edit survey by id
// @access private
router.post('/edit',passport.authenticate('jwt',{session:false}),(req,res) => {

    const {errors, isValid} = validateSurveyInput(req.body);
    //Check Validation
    if(!isValid){
        //if Any errors, send 400 with errors object
        return res.status(400).json(errors);
    }

    const editdata = {
        userID   :   req.user.id,
        name   :   req.body.name,
        dob   :   req.body.dob,
	    gender   :   req.body.gender,
	    fatherName   :   req.body.fatherName,
	    aadhaarNO   :   req.body.aadhaarNO,
        voterID   :   req.body.voterID,
        mobile   :   req.body.mobile,
        doorNo   :   req.body.doorNo,
        street   :   req.body.street,
	    area   :   req.body.area,  
	    district   :   req.body.district,  
	    pinCode   :   req.body.pinCode, 
 state   :   req.body.state,  
country   :   req.body.country, 
	    livingHere   :   req.body.livingHere,  
	    police   :   req.body.police,  
	    otherInfo   :   req.body.otherInfo,  
	    healthList   :  JSON.stringify(req.body.healthList),
	    travelList   :  JSON.stringify(req.body.travelList),
    };
  
    Survey.findOneAndUpdate({_id:req.body._id},{$set: editdata},{new: true})
    .then(survey => {
        if(!survey){
            errors.survey = 'survey not found';
            return res.status(404).json(errors);
        }
        res.json(survey);
    })
    .catch(err=> res.status(404).json({error:"Survey Not Found"}));
        
});




module.exports = router;
