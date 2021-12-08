const { Xe, KhachHang } = require('../models');

const XeService = require('../services/Xe');

const { findOne, create, update, deleteOne } = require('../configs/controller.template.config')(Xe);

const find = async (_, res) => {
    try { 
        let objList = await XeService.find();
        return res.status(200).json(objList);
    } catch(err) {
        return res.status(500).json({
            statusCode: 500,
            message: err.message || `Some errors occur while finding repair votes list`
        });
    }
}

const getCarByPlate = async (req, res) => {
    const bienSo = req.query.bienSo;
    // if(bienSo) {
    //     let data = {
    //         bienSo,
    //         hieuXe: '',
    //         tenKhachHang: '',
    //         soDT: '',
    //         tienNo: 0
    //     }
    //     await Xe.findOne({ bienSo }).then(async res1 => {
    //         await KhachHang.findOne({ _id: res1.maKhachHang }).then(res2 => {
    //             data.hieuXe = res1.maHieuXe;
    //             data.tenKhachHang = res2.tenKhachHang;
    //             data.dienThoai = res2.soDT;
    //             data.tienNo = res1.tienNo
    //         })
    //     })
    // }
    
    // console.log("DATA: ", data);
    // return res.status(200).json(data);
}

module.exports = {
    find,
    findOne,
    create,
    update,
    deleteOne,
    getCarByPlate
}