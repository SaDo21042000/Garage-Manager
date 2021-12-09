const { PhieuSuaChua, Wage, Accessory, ChiTietSuaChua, Xe, PhieuTiepNhan, DoanhSo, ChiTietDoanhSo, } = require('../models');
const { generateID } = require('../helpers/generateID');
const { json } = require('express');

const createOne = async (req, res) => {
  try{
    const { bienSo } = req.body;
    var today = new Date();
    var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
    let xe =await Xe.findOne({ bienSo });
    if(!xe) {
      return res.status(200).json({
        status:false,
        message: `Xe chưa lập phiếu tiếp nhận`,
      });
    }
    let phieuTiepNhan = await PhieuTiepNhan.findOne({ maXe: xe._id });
    let newPSC = new PhieuSuaChua({
      maPTN: phieuTiepNhan._id,
      ngaySC: date,
      tongTienSC: 0,
      isDeleted: 0
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
  let newCTSC = new ChiTietSuaChua({
    noiDung,
    maVaTu: maVatTu,
    soLuong,
    maTienCong: maTienCong,
    thanhTien: soLuong*maVT.unitPrice,
    maPSC: MaPSC
  })
  let ctsc = await newCTSC.save();
  let phieuSuaChua = await PhieuSuaChua.findOne({_id:MaPSC});
  let total = phieuSuaChua.tongTienSC + ctsc.thanhTien;
  await PhieuSuaChua.updateOne({_id:MaPSC},{tongTienSC:total});
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

const xoaCTSC = async (req, res) => {
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
    return res.status(200).json(data);
} catch (err) {
    return res.status(500).json({
        statusCode: 500,
        message: err.message || `Some errors happened when finding accessory`
    });
}

}

const getBienSo = async (req, res) => {
  try {
    let lstXe = await Xe.find();
    let lstPhieuTiepNhan = await PhieuTiepNhan.find({isDeleted:0});
    let lstPhieuSuaChua = await PhieuSuaChua.find({isDeleted:0});
    if(lstPhieuSuaChua.length===0){
      return res.status(200).json({
        status:false,
        message:'Không tồn tại danh sách xe đã lâp phiếu sửa chữa trong hệ thống',
        list:[]
      })
    }
    let list = lstPhieuSuaChua.map((item)=>{
      let objPhieuTiepNhan = lstPhieuTiepNhan.find(data=>data._id.toString()==item.maPTN);
      if( objPhieuTiepNhan) {
        let objXe =lstXe.find((data)=>data._id.toString() == objPhieuTiepNhan.maXe);
        return { 
          bienSo:objXe.bienSo,
          tongTienSC: item.tongTienSC
        }
      }
    })

    list =list.filter(item=>item);

    return res.status(200).json({
      status:true,
      message:'Lấy danh sách biển số đã sửa chữa thành công',
      list:list
    })
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

  const maPSC = req.query.maPSC;
  await ChiTietSuaChua.find({ maPSC }).then(res1 => {
    return res.status(200).json(res1);
  })
}

const getListCTSCByMaXe = async (req,res) =>{
  try{
      const maXe =req.query.maXe;
      //1 xe chỉ có 1 phieu tiep nhan
      const objPhieuTiepNhan = await PhieuTiepNhan.findOne({maXe:maXe});
      if(!objPhieuTiepNhan ) return res.status(200).json({
          status:1,
          message:  `Xe này chưa lập phiếu tiếp nhận`,
          listPhieuCTSC:[],

      })
      //1 xe chỉ có 1 phieu tiep nhan
      const objPhieuSuaChua = await PhieuSuaChua.findOne({maPTN:objPhieuTiepNhan._id.toString(),isDeleted : 0}) 
      if(!objPhieuSuaChua ) return res.status(200).json({
          status:2,
          message: `Xe này chưa lập phiếu sửa chữa`,
          listPhieuCTSC:[],
      })
      const listPhieuCTSC = await ChiTietSuaChua.find({maPSC:objPhieuSuaChua._id.toString()});
      let lstVatTu = await Accessory.find();
      let lstTienCong = await Wage.find();
      let list = listPhieuCTSC.map(item=>{
          let vatTu = lstVatTu.find(data=>data._id.toString()==item.maVaTu);
          let tienCong =lstTienCong.find(data=>data._id.toString()==item.maTienCong);
          return {
              maPSC: item.maPSC,
              noiDung: item.noiDung,
              maVaTu: vatTu.name,
              price: vatTu.unitPrice,
              wage: tienCong.name,
              soLuong: item.soLuong,
              thanhTien: item.thanhTien,
              _id:item._id.toString(),
          }
      })
      return res.status(200).json({
        listPhieuCTSC:list,
        status:0,
        message: `Lấy danh sách thành công`,
        maPSC:objPhieuSuaChua._id.toString()
      });
  }catch(err){
      return res.status(500).json({
          statusCode: 500,
          message: err.message || `Đã có lỗi xảy ra`
      });
  }
  
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
  createCTSC,
  getListCTSCByMaXe ,
  getBienSo,
  xoaCTSC,
}