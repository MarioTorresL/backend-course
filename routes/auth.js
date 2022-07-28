const router = require('express').Router();

const { check } = require('express-validator');
const {login, googleSignIn, renewToken} = require('../controllers/auth')
const {validateParams} = require('../middlewares/validate-params');
const {validateJwt} = require('../middlewares/validate-jwt');

router.post('/', 
  [
    check('email').isEmail(),
    check('password').not().isEmpty(),
    validateParams
  ],login
);

router.post('/google',
  [
    check('token', 'google token is required').not().isEmpty(),
    validateParams
  ],
  googleSignIn
);

router.get('/renew', validateJwt, renewToken);
module.exports = router;