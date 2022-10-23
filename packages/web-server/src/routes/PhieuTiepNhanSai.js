var express = require('express');
var router = express.Router();


const { createOne, getPhieuTiepNhan, xoaXeSua,getPTNbyMaXe, deleteXe, getCarToday,getListXe,  deletePTNbyPTN } = require('../controllers/PhieuTiepNhan');

router.post('/createOne', createOne);
router.get('/getPhieuTiepNhan', getPhieuTiepNhan);
router.post('/xoaXeSua', xoaXeSua);
router.get('/getPTNbyMaXe', getPTNbyMaXe);
router.get('/getListCarInToday', getCarToday);
router.post('/deleteXe', deleteXe);
router.post('/deletePTNByMaPTN', deletePTNbyPTN);
router.get('/getListXe', getListXe);

module.exports = router;
