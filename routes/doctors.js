const router = require('express').Router();
const { check } = require('express-validator');
const { validateParams } = require('../middlewares/validate-params');
const { validateJwt } = require('../middlewares/validate-jwt');

const {getDoctors, postDoctors, putDoctors, deleteDoctors} = require('../controllers/doctors');
// route: /api/doctors

router.get('/', validateJwt, getDoctors);

router.post('/',
  [
    validateJwt,
    check('name', 'name of doctor is required').not().isEmpty(),
    check('hospital', 'id of hospital invalid').isMongoId(),
    validateParams
  ], 
  postDoctors
);

router.put('/:id',
  [
    check('name', 'name of DOctor is required').not().isEmpty(),
    check('hospital'),
    validateParams
  ],
  putDoctors);

router.delete('/:id', validateJwt, deleteDoctors);

module.exports = router;