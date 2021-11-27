var express = require('express');
var router = express.Router();
const { find, create, findOne } = require('../controllers/DoanhSo');

/* GET find accessaries list */
// router.get('/:month/:year', findOne);

/* GET find accessaries list */
router.get('/', findOne);

/* POST create new accessary */
// router.post('/', create);


module.exports = router;