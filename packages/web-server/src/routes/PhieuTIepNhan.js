const express = require('express');
const router = express.Router();
const { createOne, getPhieuTiepNhan, xoaXeSua,getPTNbyMaXe, getCarByPlate, deleteXe } = require('../controllers/PhieuTiepNhan');

router.post('/createOne', createOne);
router.get('/getPhieuTiepNhan', getPhieuTiepNhan);
router.post('/xoaXeSua', xoaXeSua);
router.get('/getPTNbyMaXe', getPTNbyMaXe);
router.get('/getCarByPlate', getCarByPlate);
router.post('/deleteXe', deleteXe);

module.exports = router;