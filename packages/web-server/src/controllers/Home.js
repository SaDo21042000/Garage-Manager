const { PhieuSuaChua, Wage, Accessory, ChiTietSuaChua, Xe, PhieuTiepNhan, HieuXe, PhieuThuTien } = require('../models');
const { generateID } = require('../helpers/generateID');
const { json } = require('express');

const getInfoToday = async (req, res) => {
  try{
    var today = new Date();
    var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
    let lstPhieuSuaChua = await PhieuSuaChua.find({isDeleted:0});
    let lstPhieuTiepNhan = await PhieuTiepNhan.find({ngayTN:date});
    let lstPhieuThuTien = await PhieuThuTien.find();
    let count  = 0 ;
    let total = 0 ;
    lstPhieuThuTien.forEach(item=>{
        let dateTT=new Date(item.ngayTT);
        var time = dateTT.getDate()+'-'+(dateTT.getMonth()+1)+'-'+dateTT.getFullYear();
        if(date===time){
          count++;
          total += Number(item.soTienThu);
        }
    })   
    return res.status(200).json({
      soLuongPhieuSC: lstPhieuSuaChua.length,
      soLuongPhieuTiepNhan: lstPhieuTiepNhan.length,
      soLuongXeDaSC: count,
      soTienThuDuocHomNay: total
    });
  }catch(e){
    return res.status(500).json({
      statusCode: 500,
      message: 'Create failed'
    });
  }
}
module.exports = {
    getInfoToday
  }