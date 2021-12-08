const { LoaiVatTu } = require('../models');

/* `````````````````````````````````` */
// Put your custom services code below this line
exports.create = async input => {
    
    // Create LoaiVatTu base on input
    let newLoaiVatTu = await new LoaiVatTu({
        ...input
    });
    await newLoaiVatTu.save();

    return newLoaiVatTu;
}

exports.find = () =>{
    return LoaiVatTu.find();
}

exports.findAll = () =>{
    return LoaiVatTu.find();
}


exports.findOne = (id) =>{
    return LoaiVatTu.findOne(id);
}

exports.deleteOne = (obj) =>{
    return LoaiVatTu.deleteOne(obj);
}

/* `````````````````````````````````` */