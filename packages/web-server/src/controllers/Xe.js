const { Xe } = require('../models');

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

module.exports = {
    find,
    findOne,
    create,
    update,
    deleteOne
}