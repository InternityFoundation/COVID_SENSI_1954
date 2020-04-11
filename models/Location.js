const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema

const LocationSchema = new Schema({
    areaCode:{
        type:String,
        required:true
    },
    areaName:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    date:{
        type: Date,
        default: Date.now
    }
});

module.exports = Location = mongoose.model('locations',LocationSchema);
