const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema

const UserSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true
    }, 
    dob:{
        type:String,
    },
    aadhaarNO:{
        type:String,
    }, 
    panNO:{
        type:String,
    }, 
    rationCardNO:{
        type:String,
    }, 
    address:{
        type:String,
    },
    state:{
        type:String,
    },
    city:{
	type:String,
    },
    locationID:{
        type: Schema.Types.ObjectId,
        ref : 'locations'
    },
    familyMember:{
        type:String,
    },
    lat:{
	type:String,
    },
    lng:{
	type:String,
    },
    deviceID:{
        type:String,
    },   
    socketID:{
        type:String,
    }, 
    date:{
        type: Date,
        default: Date.now
    }
});

module.exports = User = mongoose.model('users',UserSchema);
