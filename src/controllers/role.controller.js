const logger = require('../config/logger.config');
const {
  allRoles,
  create,
  deleteRole
} = require('../services/roles.service');
const {
  createRoleValidation
} = require('../validations/role.validation');



module.exports = {

  async all(req,res) {
    try {

      const { error, message, data } = await allRoles();
      if(error) return res.status(400).json({
        error,
        message
      });


      return res.status(200).json({
        error,
        message,
        data
      });

    } catch (error) {
      logger.error(`There was an unexpected error: ${error}`);
      return res.status(500).json({
        error: true,
        message: `There was an expected error. Check the logs!`
      });
    }
  },

  async createRole(req,res) {
    try {
      
      const { error } = createRoleValidation(req.body);
      if(error) return res.status(400).json({
        error: error.details[0].message
      });

      const { error: dataError, message, data } = await create(req.body);

      if(dataError) return res.status(400).json({
        error: dataError,
        message
      });


      return res.status(200).json({
        error: dataError,
        message,
        data
      });


    } catch (error) {
      logger.error(`There was an unexpected error: ${error}`);
      return res.status(500).json({
        error: true,
        message: `There was an expected error. Check the logs!`
      });
    }
  },

  async deleteRole(req,res) {
    try {
      
      const { error, message } = await deleteRole(req.params.id);

      if(error) return res.status(400).json({
        error,
        message
      });

      return res.status(200).json({
        error,
        message
      });

    } catch (error) {
      logger.error(`There was an error: ${error}`);
      return res.status(500).json({
        error: true,
        message: `There was an expected error. Check the logs`,
      });
    }
  }

}