const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
  let errors = {};

  date.name = !isEmpty(data.name) ? data.name : ''; // require for validator to work (on w/ strings)

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = 'Name must be bettween 2 and 30 characters';
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name field is required';
  }

  // need to check to see if isValid is empty? (create is-empty.js)
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
