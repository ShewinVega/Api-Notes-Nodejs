const joi = require('joi');


module.exports = {

  signupValidation(data) {
    const schema = joi.object().keys({
      name: joi.string().required().messages({
        'any.required': 'Name is required!',
        'string.base': `Name must be valid text`,
        'string.empty': 'Name is required!',
      }),
      email: joi.string().email().required().messages({
        'any.required': 'Email is required!',
        'string.email': 'Email must be valid!'
      }),
      password: joi.string().min(3).required().messages({
        'any.required': 'Password is required!'
      }),
      confirmPassword: joi.any().valid(joi.ref('password')).required().messages({
        'any.only': 'Password do not match!',
        'any.required': 'Confirm Password is required!', 
      }),
      rol: joi.string().required().messages({
        'any.required': 'Role is required!',
        'string.base': `Role must be valid text`,
        'string.empty': 'Role is required!',
      }),
    });
    return schema.validate(data);
  }

}