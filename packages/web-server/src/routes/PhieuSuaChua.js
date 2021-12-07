const express = require('express');
const router = express.Router();
const { createOne, getAllCTSC, getVatTu, getTienCong, xoaPSC, getPlate, getPSCByMaPTN, getCTSCByMaPSC, createCTSC } = require('../controllers/PhieuSuaChua');
const { post } = require('./Bill');

router.post('/createOne', createOne);
router.post('/create-CTSC', createCTSC);
router.get('/getAllCTSC', getAllCTSC);
router.get('/getVatTu', getVatTu);
router.get('/getTienCong', getTienCong);
router.post('/xoaPSC', xoaPSC);
router.get('/getPlate', getPlate);
router.get('/getPSCByMaPTN', getPSCByMaPTN);
router.get('/getCTSCByMaPSC', getCTSCByMaPSC);

module.exports = router;