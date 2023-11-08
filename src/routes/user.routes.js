const router = require('express').Router();
const {
  signUp,
  signIn,
  all
} = require('../controllers/user.controller');
const {
  verifyToken
} = require('../middlewares/auth.middleware');


router.get('',verifyToken,all);

router.post('/signup',signUp);

router.post('/login', signIn);


module.exports = router;