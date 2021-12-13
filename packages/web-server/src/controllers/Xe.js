const { Xe, KhachHang } = require('../models');
const {ChiTietSuaChua, Wage, Accessory, HieuXe } = require('../models');

const XeService = require('../services/Xe');

const { findOne, create, update, deleteOne } = require('../configs/controller.template.config')(Xe);

const find = async (req, res) => {
    try{
        const bienSo = req.query.bienSo;
        let list = [];
        let lstXe = await Xe.find();
        if(bienSo){
          lstXe = lstXe.filter(item=>item.bienSo.toLowerCase().indexOf(bienSo.toLowerCase())!==-1)
        }
        let lstKhachHang = await KhachHang.find();
        let listHieuXe = await HieuXe.find();
        list=lstKhachHang.map(item=>{
          let xe= lstXe.find(data=>data.maKhachHang == item._id.toString());
          if(xe){
            let hieuXe = listHieuXe.find(data=>xe.maHieuXe==data.maHieuXe)
            if(hieuXe){
              return {
                _id:xe._id.toString(),
                bienSo:xe.bienSo,
                hieuXe:hieuXe.tenHieuXe,
                tenKhachHang:item.tenKhachHang,
                soDT:item.soDT,
                tienNo:xe.tienNo
              }
              
            }
          }
        })
        list = list.filter(item => item)
        return res.status(200).json(list);
      }catch(e){
          console.log(e);
        return res.status(500).json({
          message:'Đã có lỗi xảy ra vui lòng thử lại',
          error:e
        });
      }
}

const getCarByPlate = async (req, res) => {
    const bienSo = req.query.bienSo;
}
 
const getListCTSCByMaXe = async (req,res) =>{
    try{
        const maXe =req.query.maXe;
        //1 xe chỉ có 1 phieu tiep nhan
        const objPhieuTiepNhan = await phieuTiepNhan.findOne({maXe:maXe});
        if(!objPhieuTiepNhan ) return res.status(404).json({
            statusCode: 404,
            message: err.message || `Xe này chưa lập phiếu tiếp nhận`
        })
        //1 xe chỉ có 1 phieu tiep nhan
        const objPhieuSuaChua = await phieuSuaChua.findOne({maPTN:objPhieuTiepNhan._id.toString()}) 
        if(!objPhieuSuaChua ) return res.status(404).json({
            statusCode: 404,
            message: err.message || `Xe này chưa lập phiếu sửa chữa`
        })
        const listPhieuCTSC = await ChiTietSuaChua.find({maPSC:objPhieuSuaChua._id.toSTring()});
        let lstVatTu = await Accessory.find();
        let lstTienCong = await Wage.find();
        let list = listPhieuCTSC.map(item=>{
            let vatTu = lstVatTu.find(data=>data._id.toString()==item.maVaTu);
            let tienCong =lstTienCong.find(data=>data._id.toString()==item.maTienCong);
            if(vatTu&& tienCong){
              return {
                noiDung: item.noiDung,
                maVaTu: vatTu.name,
                price: vatTu.unitPrice,
                wage: tienCong.name,
                soLuong: item.soLuong,
                thanhTien: item.thanhTien,
            }
            }
            
        })
        list = list.map(item=>item);
        return res.status(200).json(list);
    }catch(e){
        return res.status(500).json({
            statusCode: 500,
            message: err.message || `Đã có lỗi xảy ra`
        });
    }
    
}

module.exports = {
    find,
    findOne,
    create,
    update,
    deleteOne,
    getCarByPlate,
    getListCTSCByMaXe
}