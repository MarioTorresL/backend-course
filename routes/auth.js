const router = require('express').Router();

const { check } = require('express-validator');
const {login, googleSignIn} = require('../controllers/auth')
const {validateParams} = require('../middlewares/validate-params');

router.post('/', 
  [
    check('email').isEmail(),
    check('password').not().isEmpty(),
    validateParams
  ],login
)

router.post('/google',
  [
    check('token', 'google token is required').not().isEmpty(),
    validateParams
  ],
  googleSignIn
)
module.exports = router;