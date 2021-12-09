const express = require('express');
const router = express.Router();
const { find, create, findOne, update, deleteOne, getCarByPlate } = require('../controllers/Xe');

/* GET find by id list */
router.get('/:id', findOne);

/* GET find list */
router.get('/', find);

/* POST */
router.post('/', create);

/* PUT */
router.put('/:id', update);

/* DELETE */
router.delete('/:id', deleteOne);

router.get('/getCarByPlate', getCarByPlate);



module.exports = router;