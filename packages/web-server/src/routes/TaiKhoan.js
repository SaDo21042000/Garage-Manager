const express = require('express');
const router = express.Router();
const {login, get } = require('../controllers/Authentication');
const {register } = require('../controllers/TaiKhoan');


/* GET find list */
router.post('/login', login);

router.post('/register', register);

module.exports = router;