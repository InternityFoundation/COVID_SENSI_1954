const Validator = require('validator');
const isEmpty   = require('../is-empty');


module.exports = function validateCheckListInput(data){
    let errors = {};

    data.stationName       = !isEmpty(data.stationName) ? data.stationName : '';
    data.userName      = !isEmpty(data.userName) ? data.userName : '';
    data.password      = !isEmpty(data.password) ? data.password : '';
    data.locationID      = !isEmpty(data.locationID) ? data.locationID : '';

    if(Validator.isEmpty(data.stationName)){
      errors.stationName= "Station Name is required";
    }
    if(Validator.isEmpty(data.userName)){
      errors.userName= "User Name is required";
    }
    if(Validator.isEmpty(data.password)){
      errors.password= "Password is required";
    }
    if(Validator.isEmpty(data.locationID)){
      errors.locationID= "LocationID is required";
    }
    return{
      errors,
      isValid: isEmpty(errors)
    };
};

