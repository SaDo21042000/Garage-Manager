const express = require('express');
const router = express.Router();
const {getInfoToday } = require('../controllers/Home');


router.get('/getInfoToday', getInfoToday);


module.exports = router;