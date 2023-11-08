
const logger = require('../config/logger.config');
const Record = require('../models/records.model');

module.exports = {

  async addRecord(user, message) {
    try {
      
      if(!message) {
        return {
          error: true,
          message: `Record message was not sent`
        }
      }



      const recordRef = new Record({user, message});
      await recordRef.save();

    } catch (error) {
      logger.error(`There is unexpected error: ${error}`);
      throw error;
    }
  }

}