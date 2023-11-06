const jwt = require('jsonwebtoken');
const constanst = require('../config/constants.config');
const logger = require('../config/logger.config');

module.exports = {

  async verifyToken(req,res,next) {
    try {
      if(!req.headers.authorization) {
        return res.status(403).json({
          error: true,
          message: `Sorry, you dont have access`
        });
      }
      const token = req.headers.authorization.split(' ')[1];

      const payload = jwt.verify(token, constanst.jwtSecretKey);
      
      if(!payload) return res.status(401).json({
        error: true,
        message: `Unauthorize`
      });

      req.payload = payload;
      next();
 
    } catch (error) {
      logger.error(`There was an error in middlewares: ${error}`);
      return res.status(401).json({
        error: true,
        message: `Token Expired`,
      });
    }
  }

}