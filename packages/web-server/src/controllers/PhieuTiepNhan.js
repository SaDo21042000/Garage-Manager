const { PhieuTiepNhan } = require('../models');
const { Xe } = require('../models');
const { KhachHang } = require('../models');
const { generateID } = require('../helpers/generateID');

const createOne = async (req, res) => {
  console.log("BODY: ", req.body);
  const { tenChuXe, diaChi, email, dienThoai } = req.body;
  const { bienSo, maHieuXe } = req.body;
  var maKhachHang = generateID('KH'), maXe = generateID('MX');

  var today = new Date();
  var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();

  //Kiem tra xe thong tin khach hang da duoc dien vao database chua?
  let user = await KhachHang.findOne({ email });

  console.log("USER: ", user);
  if(!user) {
    let newUser =  new KhachHang({
      maKhachHang,
      tenKhachHang: tenChuXe,
      diaChi,
      email,
      soDT: dienThoai
    })
    await newUser.save()
    .then(res => {
      console.log("Tạo khách hàng mới (nếu như chưa tồn tại) từ PTN: ", res)
    });
  }
  else {
    maKhachHang = user.maKhachHang;
  }

  // Tao mot Xe moi
  let newXe = new Xe({
    maXe,
    maKhachHang,
    bienSo,
    tienNo: 0,
    trangThai: 0,
    maHieuXe,
  })
  await newXe.save()
    .then(res => {
      console.log("Lưu vào bảng Xe từ PhieuTiepNhan: ", res)
    })

  // Cuoi cung la tao PhieuTiepNhan
  let newPhieuTiepNhan = new PhieuTiepNhan({
    maPTN: generateID('PTN'),
    maXe,
    ngayTN: date
  })
  try {
    await newPhieuTiepNhan.save()
    .then(res => {
     console.log("Them PTN Thanh cong: ", res)
    })
  }
  catch (err) {
    console.log("Loi them PTN: ", err)
  }

  res.status(201).json({
    statusCode: 201,
    message: 'Create new PTN successfully'
})
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

  let query = req.query;
  try {
      let xe = await Xe.find({});
      data.xe = xe;
      for(var i of xe){
        const response = await KhachHang.find({maKhachHang: i.maKhachHang});
        if(response) {
          data.khachang.push(response);
        }
      }
      if (query.name)
          xe = xe.filter(accessory => {
              return nonAccentVietnamese(accessory.name.toLowerCase()).indexOf(nonAccentVietnamese(query.name.toLowerCase())) !== -1;
          })
        // phieutiepnhan.filter()


      return res.status(200).json(data);
  } catch (err) {
      return res.status(500).json({
          statusCode: 500,
          message: err.message || `Some errors happened when finding accessory`
      });
  }
}

module.exports = {
  createOne,
  getPhieuTiepNhan,
  xoaXeSua
}