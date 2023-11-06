const express = require('express');
const databaseConnection = require('./src/config/database');
const constants = require('./src/config/constants.config');
const helmet = require('helmet');
const compression = require('compression');
const cors = require('cors');
const passport = require('passport');
const morgan = require('morgan');
const routes = require('./src/routes/index');
const logger = require('./src/config/logger.config');

// Initializations
require('dotenv').config();
const app = express();
databaseConnection();
require('./src/config/passport.config'); 

/* eslint-disable no-undef */
// app middlewares
// require('./src/config/passport.config')(passport);
const nodeEnv = process.env.NODE_ENV;
if(nodeEnv === 'production') {
  app.use(helmet);
  app.use(compression);
  app.use(cors);
}
if(nodeEnv === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', routes);
app.use(passport.initialize());

/* eslint-disable no-undef */

if(process.env.NODE_ENV !== 'test') {
  app.listen(constants.PORT, () => {
    logger.info(`Server running on port: ${constants.PORT} --- Running on ${process.env.NODE_ENV} --- Make something great.!`);
  });
}

module.exports = app;