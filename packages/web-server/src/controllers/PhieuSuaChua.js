const { PhieuSuaChua, Wage, Accessory, ChiTietSuaChua, Xe, PhieuTiepNhan } = require('../models');
const { generateID } = require('../helpers/generateID');
const { json } = require('express');

const createOne = async (req, res) => {
  console.log("BODY: ", req.body);
  const { bienSo, noiDung, nameLoaiVatTu, nameTienCong, soLuong } = req.body;
  let maVT, maTC, maXe, maPTN, maPSC;
  
  var today = new Date();
  var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();

  //  Truy xuat vao bang loai vat tu va tien cong de lat maVT va maTC
  await Accessory.findOne({ name: nameLoaiVatTu }).then(res => {
    maVT = res;
  }).catch(err => {console.log()});
  await Wage.findOne({ name: nameTienCong }).then(res => {
    maTC = res;
  }).catch(err => {console.log()});

  // Truy xuat vao bang Xe de tim phieu tiep nhan:
  await Xe.findOne({ bienSo }).then(res => {
    maXe = res;
  }).catch(err => {console.log()});
  await PhieuTiepNhan.findOne({ maXe: maXe._id }).then(res => {
    maPTN = res;
  }).catch(err => {console.log()});

  console.log("maVT: ", maVT);
  console.log("maTC: ", maTC);
  console.log("maXe: ", maXe);


  let newPSC = new PhieuSuaChua({
    maPTN: maPTN._id,
    ngaySC: date,
    tongTienSC: 0
  })
  await newPSC.save().then(res => {
    maPSC = res;
    console.log("PSC: ", res);
  })

  let newCTSC = new ChiTietSuaChua({
    maCTSC: "nul",
    noiDung,
    maVaTu: maVT._id,
    soLuong,
    maTienCong: maTC._id,
    thanhTien: soLuong*maVT.unitPrice,
    maPSC: maPSC._id
  })
  console.log("CTST: ", newCTSC)
  await newCTSC.save().then((res) => {
    console.log("CTSC: ", res);
  })
  
  // await ChiTietSuaChua.remove({});
  // await PhieuSuaChua.remove({});
  // await ChiTietSuaChua.find({}).then(res => {
  //   console.log('CTSC: ', res);
  // });
  // await PhieuSuaChua.find({}).then(res => {
  //   console.log('PSC: ', res);
  // });

}

const getAllCTSC = async (req, res) => {
  try {
    let data;
    await ChiTietSuaChua.find({}).then(res => {
      data = res;
    })
    
    return res.status(200).json(data);
} catch (err) {
    return res.status(500).json({
        statusCode: 500,
        message: err.message || `Some errors happened when finding accessory`
    });
}
}

const getVatTu = async (req, res) => {
  const maVatTu = req.query.maVatTu;
  await Accessory.findOne({ _id: maVatTu }).then(data => {
    return res.status(200).json(data);
  }).catch(err => {
    return res.status(500).json({
      statusCode: 500,
      message: err.message || `Some errors happened when finding accessory`
  });
  })

}
const getTienCong = async (req, res) => {
  const maTienCong = req.query.maTienCong;
  await Wage.findOne({ _id: maTienCong }).then(data => {
    return res.status(200).json(data);
  }).catch(err => {
    return res.status(500).json({
      statusCode: 500,
      message: err.message || `Some errors happened when finding accessory`
  });
  })
}
module.exports = {
  createOne,
  getAllCTSC,
  getVatTu,
  getTienCong
}