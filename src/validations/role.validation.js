const joi = require('joi');

module.exports = {

  createRoleValidation(data) {
    const schema = joi.object().keys({
      name: joi.string().required().messages({
        'string.base': `Name must be valid text`,
        'any.required': `Name is required!`,
      }),
    });
    return schema.validate(data);
  },

}