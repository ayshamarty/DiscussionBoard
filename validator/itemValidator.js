const Validator = require("validator");
const isEmpty = require("./is-empty");

//module.exports = function validateLoginInput(data) {
exports.itemVal = function validateLoginInput(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : "";
  data.username = !isEmpty(data.username) ? data.username : "";
  data.content = !isEmpty(data.content) ? data.content : "";


  if (Validator.isEmpty(data.username)) {
    errors.username = "Username field is required";
  }

  if (Validator.isEmpty(data.content)) {
    errors.password = "Content field is required";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Please enter valid email";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
