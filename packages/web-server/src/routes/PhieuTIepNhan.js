const express = require('express');
const router = express.Router();
const { createOne, getPhieuTiepNhan, xoaXeSua,getPTNbyMaXe, getCarByPlate, deleteXe, getCarToday,getListXe,  deletePTNbyPTN } = require('../controllers/PhieuTiepNhan');

router.post('/createOne', createOne);
router.get('/getPhieuTiepNhan', getPhieuTiepNhan);
router.post('/xoaXeSua', xoaXeSua);
router.get('/getPTNbyMaXe', getPTNbyMaXe);
router.get('/getCarByPlate', getCarByPlate);
router.get('/getListCarInToday',getCarToday)
router.post('/deleteXe', deleteXe);
router.post('/deletePTNByMaPTN', deletePTNbyPTN);
router.get('/getListXe', getListXe);

module.exports = router;