const joi = require('joi');

const userLogin = joi.object({
  email: joi.string().email().required().messages({
    'any.required': '400|The "email" field is required',
    'string.base': '422|email must be a string',
    'string.email': '422|email is not valid',
  }),
  password: joi.string().min(6).required().messages({
    'any.required': '400|The "password" field is required',
    'string.base': '422|password must be a string',
    'string.min': '422|password must have 6 characters or more',
  }),
});

module.exports = userLogin;