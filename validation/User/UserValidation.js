const Validator = require('validator');
const isEmpty   = require('../is-empty');


module.exports = function validateUserInput(data){
    let errors = {};

    data.mobileNo       = !isEmpty(data.mobileNo) ? data.mobileNo : '';
    data.area      = !isEmpty(data.area) ? data.area : '';
   // data.password      = !isEmpty(data.password) ? data.password : '';

    if(Validator.isEmpty(data.mobileNo)){
      errors.mobileNo= "Mobile No is required";
    }
    if(Validator.isEmpty(data.area)){
      errors.area= "Area is required";
    }
    return{
      errors,
      isValid: isEmpty(errors)
    };
};

