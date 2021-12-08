const { PhieuSuaChua, Wage, Accessory, ChiTietSuaChua, Xe, PhieuTiepNhan, DoanhSo, ChiTietDoanhSo } = require('../models');
const { generateID } = require('../helpers/generateID');
const { json } = require('express');

const createOne = async (req, res) => {
  try{
    const { bienSo } = req.body;
    console.log(bienSo);
    console.log('có');
    var today = new Date();
    var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
    let xe =await Xe.findOne({ bienSo });
    let phieuTiepNhan = await PhieuTiepNhan.findOne({ maXe: xe._id });
    let newPSC = new PhieuSuaChua({
      maPTN: phieuTiepNhan._id,
      ngaySC: date,
      tongTienSC: 0
    })
    let phieuSuaChua = await newPSC.save();
    return res.status(200).json(phieuSuaChua);
  }catch(e){
    console.log(e);
    return res.status(500).json({
      statusCode: 500,
      message: 'Create failed'
    });
  }
}

const createCTSC = async (req, res) => {
  console.log("BODY: ", req.body);
  const { bienSo, noiDung, maVatTu, maTienCong, soLuong, MaPSC } = req.body;
  let maVT, maTC, maXe, maPTN, maPSC;
  var today = new Date();
  var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
  //  Truy xuat vao bang loai vat tu va tien cong de lat maVT va maTC
  await Accessory.findOne({ _id: maVatTu }).then(res => {
    maVT = res;
  }).catch(err => {console.log()});
  await Wage.findOne({ _id: maTienCong }).then(res => {
    maTC = res;
  }).catch(err => {console.log()});

  // Truy xuat vao bang Xe de tim phieu tiep nhan:
  await Xe.findOne({ bienSo }).then(res => {
    maXe = res;
  }).catch(err => {console.log()});
  await PhieuTiepNhan.findOne({ maXe: maXe._id }).then(res => {
    maPTN = res;
  }).catch(err => {console.log()});
  console.log('VT',maVT);
  console.log('maTC',maTC)
  let newCTSC = new ChiTietSuaChua({
    noiDung,
    maVaTu: maVatTu,
    soLuong,
    maTienCong: maTienCong,
    thanhTien: soLuong*maVT.unitPrice,
    maPSC: MaPSC
  })
  console.log("CTSC1: ", newCTSC)
  let ctsc = await newCTSC.save()
    console.log("CTSC2: ", ctsc);

  // cập nhât số lượng sửa trong chi tiết doanh số
  date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+ today.getDate();
  today = new Date(date);
  let { maHieuXe } = await Xe.findOne({ bienSo }, { maHieuXe: 1 });
  let ds = await DoanhSo.aggregate([{$project: { month: {$month: '$ThoiDiemDS'}, year: { $year: '$ThoiDiemDS'}, tongDS: 1}}, 
    {$match: { month: today.getMonth() + 1, year: today.getFullYear()}}]);

    if(!ds[0]){
        let newDS = await new DoanhSo({ThoiDiemDS: date, tongDS: 0});
        await newDS.save();
        let { _id } = await DoanhSo.findOne({ ThoiDiemDS: date }, { _id: 1 })
        let newCtds = await new ChiTietDoanhSo({
            maHieuXe: maHieuXe,
            soLuongSua: 1,
            tiLe: 0,
            tongTien: 0,
            maDoanhSo: _id
        });
        console.log(newCtds);
        //await newCtds.save();
    } else {
        let ctds = await ChiTietDoanhSo.findOne({ maDoanhSo: ds[0]._id, maHieuXe: maHieuXe });
        if(!ctds) {
            let newCtds = await new ChiTietDoanhSo({
                maHieuXe: maHieuXe,
                soLuongSua: 1,
                tiLe: 0.5,
                tongTien: 0,
                maDoanhSo: ds[0]._id
            });
            await newCtds.save();
        } else {
            await ChiTietDoanhSo.updateOne({ _id: ctds._id }, { soLuongSua: ctds.soLuongSua + 1 });
        }      
    }

  // cập nhật tiền nợ trong xe
  await Xe.updateOne({ bienSo: bienSo }, { tienNo: maXe.tienNo + soLuong*maVT.unitPrice })

  return res.status(201).json({
    statusCode: 201,
    message: 'Receiving your form succesfully'
  });
}

const xoaPSC = async (req, res) => {
  const idCTSC =  req.body._id;

  try {
    await ChiTietSuaChua.deleteOne({ _id: idCTSC })
    res.status(201).json({
      statusCode: 201,
      message: 'Xoa thanh cong' })  
  } catch (err){
    console.log("Error xoa xe: ", err);
  }
}

const getAllCTSC = async (req, res) => {
  try {
    let data;
    await ChiTietSuaChua.find({}).then(res => {
      data = res;
    })
    console.log('data',  data);

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



const getPlate = async (req, res) => {
  const plateFilter = req.query.plateFilter;
  try {
    let data;
    await Xe.find({ bienSo: plateFilter }).then(res => {
      data = res;
    })
    console.log('data',  data);

    return res.status(200).json(data);
} catch (err) {
    return res.status(500).json({
        statusCode: 500,
        message: err.message || `Some errors happened when finding accessory`
    });
}

}

const getPSCByMaPTN = async (req, res) => {
  const maPTN = req.query.maPTN;
  await PhieuSuaChua.find({ maPTN }).then(res1 => {
    return res.status(200).json(res1);
  })
}

const getCTSCByMaPSC = async (req, res) => {
  console.log('cos')
  const maPSC = req.query.maPSC;
  await ChiTietSuaChua.find({ maPSC }).then(res1 => {
    return res.status(200).json(res1);
  })
}
module.exports = {
  createOne,
  getAllCTSC,
  getVatTu,
  getTienCong,
  xoaPSC,
  getPlate,
  getPSCByMaPTN,
  getCTSCByMaPSC,
  createCTSC
}