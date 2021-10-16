const { HieuXe } = require('../models');

/* `````````````````````````````````` */
// Put your custom services code below this line
exports.create = async input => {
    
    // Create HieuXe base on input
    let newHieuXe = await new HieuXe({
        ...input
    });
    await newHieuXe.save();

    return newHieuXe;
}

exports.find = () =>{
    return HieuXe.find({ name: 'hóa đơn điện'});
}

exports.findOne = (id) =>{
    return HieuXe.findById(id);
}

/* `````````````````````````````````` */