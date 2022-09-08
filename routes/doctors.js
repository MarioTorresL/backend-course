const router = require('express').Router();
const { check } = require('express-validator');
const { validateParams } = require('../middlewares/validate-params');
const { validateJwt } = require('../middlewares/validate-jwt');

const {getDoctors, postDoctors, putDoctors, deleteDoctors, getOneDoctor} = require('../controllers/doctors');
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
    check('name', 'name of Doctor is required').not().isEmpty(),
    check('hospital', 'id of hospital must be valid').isMongoId(),
    validateParams
  ],
  putDoctors);

router.delete('/:id', validateJwt, deleteDoctors);

router.get('/:id', 
  [
    check('id', 'id of hospital must be valid').isMongoId(),
    validateJwt
  ], 
  getOneDoctor)

module.exports = router;
