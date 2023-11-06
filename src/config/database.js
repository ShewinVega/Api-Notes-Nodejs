const mongoose = require('mongoose');
const constants = require('./constants.config');
const logger = require('./logger.config');

require('dotenv').config();



const connection = async () => {

  try {
    
    /* eslint-disable no-undef */
    await mongoose.connect(constants.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    logger.info(`Database Conected`);

  } catch (error) {
    logger.error(`Database connection failed: ${error}`);
  }

}

module.exports = connection;