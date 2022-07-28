const router = require('express').Router();

const { validateJwt } = require('../middlewares/validate-jwt');

const { getSearch, getCollection } = require('../controllers/search');

// route: api/search

router.get('/:search', validateJwt, getSearch);
router.get('/collection/:table/:search', validateJwt, getCollection);

module.exports = router;