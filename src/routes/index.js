const router = require('express').Router();


router.use('/users', require('./user.routes'));
router.use('/notes', require('./notes.routes'));
router.use('/roles', require('./roles.routes'));


module.exports = router;