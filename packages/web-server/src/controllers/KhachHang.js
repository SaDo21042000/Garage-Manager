const { KhachHang } = require('../models');

const KhachHangService = require('../services/KhachHang');

const { findOne, create, update, deleteOne } = require('../configs/controller.template.config')(KhachHang);

const find = async (_, res) => {
    try { 
        let objList = await KhachHangService.find();
        return res.status(200).json(objList);
    } catch(err) {
        return res.status(500).json({
            statusCode: 500,
            message: err.message || `Some errors occur while finding repair votes list`
        });
    }
}

module.exports = {
    find,
    findOne,
    create,
    update,
    deleteOne
}