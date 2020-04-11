const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema

const SurveySchema = new Schema({
    userID:{
        type: Schema.Types.ObjectId,
        ref : 'users'
    },
    name:{
        type:String,
    },
    dob:{
        type:String,
    },
    gender:{
        type:String,
    },
    fatherName:{
        type:String,
       
    },
    aadhaarNO:{
        type:String,
       
    },
    voterID:{
        type:String,
        
    },
    mobile:{
        type:String,
        
    },
    doorNo:{
        type:String,
        
    },
    street:{
        type:String,
  
    },
    area:{
        type:String,
       
    },
    district:{
        type:String,
        
    },
    pinCode:{
        type:String,
       
    },
    state:{
        type:String,
    },
    country:{
        type:String,
    },
    livingHere:{
        type:String,

    },
    police:{
        type:String,
       
    },
    otherInfo:{
        type:String,
     
    },
    healthList:{
        type:String,
       
    },
    travelList:{
        type:String,
    
    },
    date:{
        type: Date,
        default: Date.now
    }
});

module.exports = Survey = mongoose.model('surveys',SurveySchema);
