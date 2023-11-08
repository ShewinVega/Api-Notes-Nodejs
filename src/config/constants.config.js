require('dotenv').config();


/* eslint-disable no-undef */
const devConfig = {
  MONGO_URL: process.env.MONGO_URI,
  jwtSecretKey: process.env.JWT_SECRET_KEY  ,
  PORT: process.env.PORT || 3000,
};
const testConfig = {
  MONGO_URL: process.env.MONGO_URI_TEST,
  jwtSecretKey: process.env.JWT_SECRET_KEY,
};
const prodConfig = {
  jwtSecretKey: process.env.JWT_SECRET_KEY,
  PORT: process.env.PORT || 3000,
};
/* const defaultConfig = {
  PORT: process.env.PORT || 3000,
}; */


function envConfig(env) {

  switch(env) {

    case 'development':
      return devConfig;
    case 'test': 
      return testConfig;
    default: 
      return prodConfig;
  }
}


// Exporting defaultConfig and envConfig type

module.exports = {
  // ...defaultConfig,
  ...envConfig(process.env.NODE_ENV)
}