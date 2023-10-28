const mongoose = require('mongoose');

require('dotenv').config();



const connection = async () => {

  try {
    
    /* eslint-disable no-undef */
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`Database connected`);

  } catch (error) {
    console.log(`Database connection failed: ${error}`);
  }

}

module.exports = connection;