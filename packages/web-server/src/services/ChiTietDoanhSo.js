const { ChiTietDoanhSo } = require('../models');

/* `````````````````````````````````` */
// Put your custom services code below this line
exports.create = async input => {
    
    // Create ChiTietDoanhSo base on input
    let newChiTietDoanhSo = await new ChiTietDoanhSo({
        ...input
    });
    await newChiTietDoanhSo.save();

    return newChiTietDoanhSo;
}

exports.find = (query) =>{
    return ChiTietDoanhSo.find({ maDoanhSo: query.maDoanhSo });
}

exports.findOne = (id) =>{
    return ChiTietDoanhSo.findById(id);
}

/* `````````````````````````````````` */