const express = require('express');
const router = express.Router();
const { createOne, getPhieuTiepNhan, xoaXeSua,getPTNbyMaXe } = require('../controllers/PhieuTiepNhan');

router.post('/createOne', createOne);
router.get('/getPhieuTiepNhan', getPhieuTiepNhan);
router.post('/xoaXeSua', xoaXeSua);
router.get('/getPTNbyMaXe', getPTNbyMaXe);

module.exports = router;