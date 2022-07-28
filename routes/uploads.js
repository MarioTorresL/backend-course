const router = require('express').Router();
const expressFileUpload = require('express-fileupload');

const { validateJwt } = require('../middlewares/validate-jwt');

const { fileUpload, getImage } = require('../controllers/uploads');

// route: api/uploads/
router.use(expressFileUpload());

router.put('/:type/:id', validateJwt, fileUpload);
router.get('/:type/:image', getImage);

module.exports = router;