const { ChiTietDoanhSo } = require('../models');

const ChiTietDoanhSoService = require('../services/ChiTietDoanhSo');

const { findOne, create, update, deleteOne } = require('../configs/controller.template.config')(ChiTietDoanhSo);

const find = async (req, res) => {
    try { 
        let query = req.query;
        let objList = await ChiTietDoanhSoService.find(query);
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