const Role = require('../models/roles.model');
const logger = require('../config/logger.config');


module.exports = {

  async allRoles() {
    try {
      
      const data = await Role.find({});

      if(!data) {
        return {
          error: true,
          message: `There are not register of roles in the system`
        }
      }

      return {
        error: false,
        message: `Roles`,
        data
      }

    } catch (error) {
      logger.error(`There was an unexpected error: ${error}`);
      return {
        error: true,
        message: `There was an unexpected error. Check the logs!`,
      }
    }
  },

  async create(body) {
    try {
      
      const newRole = new Role(body);
      const data = await newRole.save();

      if(!data) {
        return {
          error: true,
          message: `Role was not created`
        }
      }

      return {
        error: false,
        message: `Role created successfully`,
        data
      }

    } catch (error) {
      logger.error(`There was an unexpected error: ${error}`);
      return {
        error: true,
        message: `There was an unexpected error. Check the logs!`,
      }
    }
  },


  async deleteRole(id) {
    try {
      
      if(!id) return {
        error: true,
        message: `Note identification was not sent!`,
      }

      const roleDeleted = await Role.findByIdAndDelete(id);

      if(!roleDeleted) return {
        error: true,
        message: `Role was not deleted!`,
      }

      return {
        error: false,
        message: `Role was deleted successfully`,
      }

    } catch (error) {
      logger.error(`There was an error: ${error}`);
      return {
        error: true,
        message: `There was an unexpected error!. check the logs`,
      }
    }
  }

}