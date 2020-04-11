const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema

const PoliceStationSchema = new Schema({
    stationName:{
        type:String,
        required:true
    }, 
    userName:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }, 
    locationID:{
        type: Schema.Types.ObjectId,
        ref : 'locations'
    },
    date:{
        type: Date,
        default: Date.now
    }
});

module.exports = PoliceStation = mongoose.model('policestations',PoliceStationSchema);
