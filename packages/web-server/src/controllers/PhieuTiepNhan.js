const { PhieuTiepNhan, PhieuThuTien, PhieuSuaChua, ChiTietSuaChua } = require('../models');
const { Xe } = require('../models');
const { KhachHang } = require('../models');
const { generateID } = require('../helpers/generateID');

const createOne = async (req, res) => {
  try{
    console.log("BODY: ", req.body);
    const { tenChuXe, diaChi, email, dienThoai } = req.body;
    const { bienSo, maHieuXe } = req.body;
    var today = new Date();
    var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
    let xe = await Xe .findOne({bienSo:bienSo});
    console.log('xe',xe);
    if(xe){
      let phieuTiepNhan = await PhieuTiepNhan.findOne({maXe:xe._id.toString(),isDeleted:0})
      console.log('phieu',phieuTiepNhan);
      if(!phieuTiepNhan){
        console.log('có')
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
  console.log("req.body", req.body.plate);
  try {
    await Xe.deleteMany({ bienSo: req.body.plate })
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
      let PTNToday = await PhieuTiepNhan.find({ ngayTN: date });
      for(var i of PTNToday) {
        let xe = await Xe.find({ _id: i.maXe });
        console.log("xE: ", xe);
        let khachhang = await KhachHang.find({ _id: xe[0].maKhachHang });
        console.log("KHACH-Hang: ", khachhang);


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
  await PhieuTiepNhan.find({ maXe }).then( async res1 => {
    let data = res1;
    return res.status(200).json(data);
    
  })
}


const getCarByPlate = async (req, res) => {
  try{
    const bienSo = req.query.bienSo;
    let list = [];
    let lstXe = await Xe.find();

    if(bienSo){
      lstXe = lstXe.filter(item=>item.bienSo.toLowerCase().indexOf(bienSo.toLowerCase())!==-1)
    }
    let lstKhachHang = await KhachHang.find();
    list=lstKhachHang.map(item=>{
      let xe= lstXe.find(data=>data.maKhachHang == item._id.toString());
      if(xe){
        console.log(xe);
          return {
          _id:xe._id.toString(),
          bienSo:xe.bienSo,
          hieuXe:xe.maHieuXe,
          tenKhachHang:item.tenKhachHang,
          soDT:item.soDT,
          tienNo:xe.tienNo
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

const getCarToday = async (req, res) => {
  try{
    var today = new Date();
    let date = today.getDate();
    let month = today.getMonth()+1;
    let year = today.getFullYear();
    let stringDate =date+'-'+month+'-'+year;
    let listPTN = await PhieuTiepNhan.find({ngayTN:stringDate, isDeleted:0});
    let lstXe = await Xe.find();
    let lstKhachHang = await KhachHang.find();
    let list=listPTN.map(item=>{
      let xe= lstXe.find(data=>data._id.toString() == item.maXe);
      if(xe){
        let khachHang = lstKhachHang.find(data=>data._id.toString() == xe.maKhachHang);
          return {
          _id:item._id.toString(),
          bienSo:xe.bienSo,
          hieuXe:xe.maHieuXe,
          tenKhachHang:khachHang.tenKhachHang,
          soDT:khachHang.soDT,
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

const getListXe = async (req, res) => {
  try{
    let xe = await Xe.find();
    let phieuTiepNhan = await PhieuTiepNhan.find({isDeleted:0});
    console.log('xe',xe)
    console.log('phieuTiepNhan',phieuTiepNhan)
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
    console.log(e)
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
    console.log('body', req.body)
    console.log('maPTN', maPTN);
    await PhieuTiepNhan.update({ _id: maPTN }, {isDeleted:1})
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
  getCarByPlate,
  deleteXe,
  getCarToday,
  deletePTNbyPTN,
  getListXe
}