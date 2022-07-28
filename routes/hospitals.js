const router = require('express').Router();
const { check } = require('express-validator');
const { validateParams } = require('../middlewares/validate-params');

const { validateJwt } = require('../middlewares/validate-jwt');

const { getHospitals, postHospitals, putHospitals, deleteHospitals } = require('../controllers/hospitals')
// route: /api/hospitals

router.get('/', validateJwt, getHospitals);

router.post('/',
  [
    validateJwt,
    check('name', 'name of hospital is required').not().isEmpty(),
    validateParams
  ],
  postHospitals
);

router.put('/:id', 
  [], 
  putHospitals
);

router.delete('/:id', validateJwt, deleteHospitals);

module.exports = router;