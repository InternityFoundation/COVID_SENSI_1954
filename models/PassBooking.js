const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema

const PassBookingSchema = new Schema({
    userID:{
        type: Schema.Types.ObjectId,
        ref : 'users'
    },
    locationID:{
        type: Schema.Types.ObjectId,
        ref : 'locations'
    },
    purpose:{
        type:String,
        required:true
    }, 
    selectedDate:{
        type:String,
        required:true
    }, 
    destination:{
        type:String,
        required:true
    },
    timeAlotted:{
        type:String,
        required:true
    }, 
    startTime:{
        type:String,
        required:true
    }, 
    endTime:{
        type:String,
        required:true
    },
    travelMode:{
        type:String,
        required:true
    },
    vehicleNo:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    date:{
        type: Date,
        default: Date.now
    }
});

module.exports = PassBooking = mongoose.model('passbookings',PassBookingSchema);
