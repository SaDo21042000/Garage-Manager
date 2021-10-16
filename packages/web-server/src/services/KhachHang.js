const { KhachHang } = require('../models');

/* `````````````````````````````````` */
// Put your custom services code below this line
exports.create = async input => {
    
    // Create KhachHang base on input
    let newKhachHang = await new KhachHang({
        ...input
    });
    await newKhachHang.save();

    return newKhachHang;
}

exports.find = () =>{
    return KhachHang.find({ name: 'hóa đơn điện'});
}

exports.findOne = (id) =>{
    return KhachHang.findById(id);
}

/* `````````````````````````````````` */