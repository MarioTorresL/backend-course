const router = require('express').Router();
const { check } = require('express-validator');
const {validateParams} = require('../middlewares/validate-params');

const { getUsers, postUsers, putUsers, deleteUser} = require('../controllers/users');
const { validateJwt, validateADMIN_ROLE, validateADMIN_ROLE_or_sameUser } = require('../middlewares/validate-jwt');

// route:/api/users

router.get('/', validateJwt, getUsers);

router.post('/',
  [
    check('name', 'name is reuired').not().isEmpty(),
    check('password', 'password is required').not().isEmpty(),
    check('email').isEmail(),
    validateParams
  ], postUsers
);

router.put('/:id', 
  [
    validateJwt,
    validateADMIN_ROLE_or_sameUser,
    check('name', 'name is reuired').not().isEmpty(),
    check('email').isEmail(),
    validateParams,
  ], 
  putUsers
);

router.delete('/:id', [validateJwt, validateADMIN_ROLE], deleteUser);

module.exports = router;
