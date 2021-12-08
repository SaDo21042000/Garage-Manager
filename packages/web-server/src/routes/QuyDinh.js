const express = require('express');
const router = express.Router();
const {  update,  get} = require('../controllers/QuyDinh');
const {isAuth}=require('../middlewares/AuthMiddleware')

// /* GET find by id list */
// router.get('/:id', findOne);

// /* GET find list */
router.post('/get', get);

// /* POST */
// router.post('/', create);

/* PUT */
router.post('/update', update);

/* DELETE */
// router.delete('/:id', deleteOne);


module.exports = router;