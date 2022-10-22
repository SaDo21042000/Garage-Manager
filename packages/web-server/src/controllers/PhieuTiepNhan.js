const { PhieuTiepNhan, HieuXe, QuyDinh, PhieuSuaChua } = require('../models');
const { Xe } = require('../models');
const { KhachHang } = require('../models');
const { generateID } = require('../helpers/generateID');

const createOne = async (req, res) => {
  try{
    const { tenChuXe, diaChi, email, dienThoai } = req.body;
    const { bienSo, maHieuXe } = req.body;
    
    var today = new Date();
    var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
    let lstPhieuTiepNhan = await PhieuTiepNhan.find({isDeleted:0,ngayTN:date});
    let objQuyDinh = await QuyDinh.findOne();
    if(objQuyDinh){
      if(lstPhieuTiepNhan.length>=objQuyDinh.soXeMax){
          return res.status(200).json({
            status:1,
            message:'Đã tiếp nhận đủ số xe cần sửa trong ngày theo quy dịnh. Vui lòng quay lại vào ngày mai'
          })
      }
    }
    let xe = await Xe .findOne({bienSo:bienSo});
    if(xe){
      let phieuTiepNhan = await PhieuTiepNhan.findOne({maXe:xe._id.toString(),isDeleted:0})
      if(!phieuTiepNhan){
        let newPhieuTiepNhan = new PhieuTiepNhan({
          maXe: xe._id.toString(),
          ngayTN: date,
          isDeleted:0
        })
        await newPhieuTiepNhan.save()
        return res.status(200).json({
          status:0,
          message:'Lập phiếu tiếp nhận thành công'
        })
      }else{
        return res.status(200).json({
          status:1,
          message:'Xe này đã lập phiếu tiếp nhận. Vui lòng kiểm tra lại'
        })
      }
       
    }else{
      let newUser =  new KhachHang({
        tenKhachHang: tenChuXe,
        diaChi,
        email,
        soDT: dienThoai
      })
      let user = await newUser.save();
      // Tao mot Xe moi
      let newXe = new Xe({
        maKhachHang: user._id,
        bienSo,
        tienNo: 0,
        trangThai: 0,
        maHieuXe,
      })
      let xe = await newXe.save()
      let newPhieuTiepNhan = new PhieuTiepNhan({
        maXe: xe._id.toString(),
        ngayTN: date,
        isDeleted:0
      })
      await newPhieuTiepNhan.save()
      return res.status(200).json({
        status:0,
        message:'Lập phiếu tiếp nhận thành công',
        isDeleted:0
      })
    }

  }
  catch(e){
    return res.status(500).json({
      message:'Đã có lỗi xảy ra vui lòng thử lại',
      error:e
    });
  }
  
}

const xoaXeSua = async (req, res) => {
  try {
    let phieuTiepNhan = await PhieuTiepNhan.findOne({maXe:req.body.plate, isDeleted:0});
    if(phieuTiepNhan){
      let phieuSuaChua  = await PhieuSuaChua.findOne({maPTN:phieuTiepNhan._id, isDeleted:0});
        await  PhieuTiepNhan.deleteOne({ _id: phieuTiepNhan._id });
      if(phieuSuaChua){
        await  PhieuSuaChua.deleteOne({ _id: phieuSuaChua._id });
      }
    }
    await Xe.deleteOne({ bienSo: req.body.plate });

    res.status(201).json({
      statusCode: 201,
      message: 'Xoa thanh cong' })  
  } catch (err){
    console.log("Error xoa xe: ", err);
  }

}

const getPhieuTiepNhan = async (req, res) => {

  let data = {
    xe: [],
    khachang: []
  };

  var today = new Date();
  var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();

  try {
      let PTNToday = await PhieuTiepNhan.find({ ngayTN: date, isDeleted:0 });
      for(var i of PTNToday) {
        let xe = await Xe.find({ _id: i.maXe });
        let khachhang = await KhachHang.find({ _id: xe[0].maKhachHang });
        data.xe.push(xe[0]);
        data.khachang.push(khachhang);
      }
;

      return res.status(200).json(data);
  } catch (err) {
      return res.status(500).json({
          statusCode: 500,
          message: err.message || `Some errors happened when finding accessory`
      });
  }

}
const getPTNbyMaXe = async (req, res) => {

  let maXe = req.query.maXe;
  
  // Lay ma PhieuTiepNhan tu maXe ma nguoi dung nhap len
  await PhieuTiepNhan.find({ maXe, isDeleted:0 }).then( async res1 => {
    let data = res1;
    return res.status(200).json(data);
    
  })
}

const getCarToday = async (req, res) => {
  try{
    var today = new Date();
    let date = today.getDate();
    let month = today.getMonth()+1;
    let year = today.getFullYear();
    let stringDate =date+'-'+month+'-'+year;
    let listPTN = await PhieuTiepNhan.find({ngayTN:stringDate, isDeleted:0})
    .populate({
      path: 'maXe',
      populate: 'maKhachHang',
     })
    let listHieuXe = await HieuXe.find();
    let list=listPTN.map(item=>{
      if(item.maXe){
        let objHieuXe = listHieuXe.find(data=>data.maHieuXe == item.maXe.maHieuXe);
        if(objHieuXe){
          if(item.maXe.maKhachHang){
            return {
              _id:item._id.toString(),
              bienSo:item.maXe.bienSo,
              hieuXe: objHieuXe.tenHieuXe,
              tenKhachHang:item.maXe.maKhachHang.tenKhachHang,
              soDT:item.maXe.maKhachHang.soDT,
            }
          }
          
        }
      }
     
          
    })
    list = list.filter(item=>item);
    return res.status(200).json(list);
  }catch(e){
    console.log(e);
    return res.status(500).json({
      message:'Đã có lỗi xảy ra vui lòng thử lại',
      error:e
    });
  }
  
    

}

const getListXe = async (req, res) => {
  try{
    let xe = await Xe.find();
    let phieuTiepNhan = await PhieuTiepNhan.find({isDeleted:0});
    let list = phieuTiepNhan.map(item=>{
      let objXe = xe.find(data=>data._id.toString()==item.maXe);
      if(objXe){
        return {
          _id:objXe._id,
          bienSo:objXe.bienSo
        }
      }
      
    })
    list = list.filter(item => item)
    return res.status(200).json(list);
  }catch(e){
    return res.status(500).json({
      message:'Đã có lỗi xảy ra vui lòng thử lại',
      error:e
    });
  }
  
}


const deleteXe = async (req, res) => {
  try{
    const maXe = req.body._id;
    await Xe.deleteOne({ _id: maXe })
    let phieuTiepNhan = await PhieuTiepNhan.findOne({maXe:maXe, isDeleted:0});
    console.log(phieuTiepNhan);
    if(phieuTiepNhan){
      let phieuSuaChua  = await PhieuSuaChua.findOne({maPTN:phieuTiepNhan._id, isDeleted:0});
      console.log(phieuTiepNhan);
        await  PhieuTiepNhan.deleteOne({ _id: phieuTiepNhan._id });
      if(phieuSuaChua){
        await  PhieuSuaChua.deleteOne({ _id: phieuSuaChua._id });
      }
    }
    return res.status(200).json({});
  }catch(e){
    return res.status(500).json({
      message:'Đã có lỗi xảy ra vui lòng thử lại',
      error:e
    });
  }
  
}

const deletePTNbyPTN = async (req, res) => {
  try{
    const maPTN = req.body.maPTN;
    await PhieuTiepNhan.update({ _id: maPTN, isDeleted:0 }, {isDeleted:1})
    await PhieuSuaChua.update({maPTN: maPTN,  isDeleted:0 }, {isDeleted:1})
    return res.status(200).json({});
  }catch(e){
    return res.status(500).json({
      message:'Đã có lỗi xảy ra vui lòng thử lại',
      error:e
    });
  }
  
}
module.exports = {
  createOne,
  getPhieuTiepNhan,
  xoaXeSua,
  getPTNbyMaXe,
  deleteXe,
  getCarToday,
  deletePTNbyPTN,
  getListXe
}