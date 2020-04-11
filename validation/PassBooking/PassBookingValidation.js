const Validator = require('validator');
const isEmpty   = require('../is-empty');


module.exports = function validatePassBookingInput(data){
    let errors = {};

    data.purpose       = !isEmpty(data.purpose) ? data.purpose : '';
    data.date      = !isEmpty(data.date) ? data.date : '';
    data.destination      = !isEmpty(data.destination) ? data.destination : '';
    data.timeAlotted      = !isEmpty(data.timeAlotted) ? data.timeAlotted : '';
 data.startTime      = !isEmpty(data.startTime) ? data.startTime : '';
 data.endTime      = !isEmpty(data.endTime) ? data.endTime : '';
 data.travelMode      = !isEmpty(data.travelMode) ? data.travelMode : '';
 data.vehicleNo      = !isEmpty(data.vehicleNo) ? data.vehicleNo : '';



    if(Validator.isEmpty(data.purpose)){
      errors.purpose= "Purpose of travel is required";
    }
    if(Validator.isEmpty(data.date)){
      errors.date= "Date of Travel is required";
    }
    if(Validator.isEmpty(data.destination)){
      errors.destination= "Destination is required";
    }
   if(Validator.isEmpty(data.timeAlotted)){
      errors.timeAlotted= "Time Alotted is required";
    }
    if(Validator.isEmpty(data.startTime)){
      errors.startTime= "Start Time is required";
    }
   if(Validator.isEmpty(data.endTime)){
      errors.endTime= "End Time is required";
    }
   if(Validator.isEmpty(data.travelMode)){
      errors.travelMode= "Travel Mode is required";
    }
   if(Validator.isEmpty(data.vehicleNo)){
      errors.vehicleNo= "Vehicle No is required";
    }
    return{
      errors,
      isValid: isEmpty(errors)
    };
};

       
