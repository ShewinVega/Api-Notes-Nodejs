const jwt = require('jsonwebtoken');
const constants = require('../config/constants.config');
const User = require('../models/user.model');
const Role = require('../models/roles.model');
const logger = require('../config/logger.config');

module.exports = {

  async allUsers(){
    try {
      
      const data = await User.find({}).populate({
        path: 'rol',
        select: 'name'
      }).select(['-__v','-updatedAt']).select(["-__v","-password"]);
      if(!data) return {
        error: true,
        message: `There is not data in the system`,
      }

      return {
        error: false,
        message: `Users`,
        data
      }

    } catch (error) {
      logger.error(`There was an error: ${error}`);
      return {
        error: true,
        message: `There was an unexpected error!. check the logs`,
      }
    }
  },

  async signup(body) {
    try {
      
      const { email, password, rol } = body;

      const roleExist = await Role.findOne({_id: rol});
      if(!roleExist) {
        return {
          error: true,
          message: `Role does not exist`,
        }
      }

      // Email validation
      const userEmail = await User.findOne({email});
      if(userEmail) return {
        error: true,
        message: `Email already exist!`,
      }

      const newUser = new User({
        name: body.name,
        email,
        password,
        rol
      });

      // Encrypt password
      newUser.password = await newUser.encryptPassword(password);

      // Save user in the database
      const data = await newUser.save();

      if(!data) return {
        error: true,
        message: `User created successfully`,
      }

      const newData = await User.findById(data._id).populate({
        path: 'rol',
        select: 'name'
      }).select(['-__v','-updatedAt']);

      return {
        error: false,
        message: `User created successfully`,
        data: newData
      }

    } catch (error) {
      logger.error(`There was an error: ${error}`);
      return {
        error: true,
        message: `There was an unexpected error!. check the logs`,
      }
    }

  },

  login(user) {

    try {
      
      const token = jwt.sign({id: user._id, name: user.name, email: user.email}, constants.jwtSecretKey,{
        expiresIn: '24h',
      });

      if(!token) {
        return {
          error: true,
          message: `Authentication Failed`,
        }
      }

      return {
        error: false,
        message: 'User Authenticated',
        token
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