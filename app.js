const express = require('express');
const databaseConnection = require('./src/config/database');

// Initializations
require('dotenv').config();
const app = express();
databaseConnection();


/* eslint-disable no-undef */
app.listen(process.env.PORT, () => {
  console.log(`Server running on Port: ${process.env.PORT}`);
});

module.exports = app;