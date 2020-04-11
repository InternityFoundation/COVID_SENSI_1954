const Validator = require('validator');
const isEmpty   = require('../is-empty');


module.exports = function validateLocationInput(data){
    let errors = {};

    data.areaCode       = !isEmpty(data.areaCode) ? data.areaCode : '';
    data.areaName      = !isEmpty(data.areaName) ? data.areaName : '';
    data.city      = !isEmpty(data.city) ? data.city : '';
    data.state      = !isEmpty(data.state) ? data.state : '';

    if(Validator.isEmpty(data.areaCode)){
      errors.areaCode= "Area Code is required";
    }
    if(Validator.isEmpty(data.areaName)){
      errors.areaName= "Area Name is required";
    }
    if(Validator.isEmpty(data.city)){
      errors.city= "City is required";
    }
    if(Validator.isEmpty(data.state)){
      errors.state= "State is required";
    }
    return{
      errors,
      isValid: isEmpty(errors)
    };
};

