const passport = require('passport');
const {
  signupValidation
} = require('../validations/user.validation');
const {
  signup,
  login,
  allUsers
} = require('../services/user.service');
const logger = require('../config/logger.config');


module.exports = {

  async all(req,res){
    try {
        
      const { error, message, data } = await allUsers();

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
      logger.error(`There was an error: ${error}`);
      return res.status(500).json({
        error: true,
        message: `There was an unexpected error(controller)!. check the logs`,
      });
    }
  },

  async signUp(req,res) {
    try {
      const { error } = signupValidation(req.body);
      if(error) return res.status(400).json({
        error: error.details[0].message
      });

      const { error: dataError, message, data } = await signup(req.body);

      if(dataError) return res.status(400).json({
        error,
        message
      });

      return res.status(200).json({
        error,
        message,
        data
      });
    } catch (error) {
      logger.error(`There was an error: ${error}`);
      return res.status(500).json({
        error: true,
        message: `There was an unexpected error!. check the logs`,
      });
    }
  },

  signIn(req,res, next) {

    passport.authenticate('local',async (err, user, info) => {

      try {
        
        if(err) {

          return res.status(403).json({
            error: true,
            message: info.message
          });
        }

        if(!user) {
          return res.status(401).json({
            error: true,
            message: `Authentication Failed`
          });
        }

        const { error: dataError, message, token } = login(user);

        if(dataError) return res.status(400).json({
          error: dataError,
          message
        });

        return res.status(200).json({
          error: dataError,
          message,
          token
        });

      } catch (error) {
        logger.error(`There was an error: ${error}`);
        return res.status(500).json({
          error: true,
          message: `There was an unexpected error!. check the logs`,
        });
      }

    }, { session: false })(req,res, next);

  },

}