const router = require('express').Router();

const { check } = require('express-validator');
const {login} = require('../controllers/auth')
const {validateParams} = require('../middlewares/validate-params');

router.post('/', 
  [
    check('email').isEmail(),
    check('password').not().isEmpty(),
    validateParams
  ],login
)
module.exports = router;