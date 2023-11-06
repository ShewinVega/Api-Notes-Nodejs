const router = require('express').Router();

const {
  all,
  createRole,
  deleteRole
} = require('../controllers/role.controller');


router.get('',all);
router.post('/create', createRole);

router.delete('/:id', deleteRole);

module.exports = router;