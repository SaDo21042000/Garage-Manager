const express = require('express');
const router = express.Router();
const { find, create, findOne, update, deleteOne, getAll } = require('../controllers/HieuXe');
const {isAdminAuth}=require('../middlewares/AuthMiddleware')

/* GET find by id list */
router.get('/:id', findOne);

/* GET find list */
router.get('/', find);



/* PUT */
router.put('/:id', update);

/* DELETE */
router.post('/delete',isAdminAuth, deleteOne);

router.post('/create',isAdminAuth, create);

router.post('/get-all', getAll);


module.exports = router;