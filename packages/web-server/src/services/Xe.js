const { Xe } = require('../models');

/* `````````````````````````````````` */
// Put your custom services code below this line
exports.create = async input => {
    
    // Create Xe base on input
    let newXe = await new Xe({
        ...input
    });
    await newXe.save();

    return newXe;
}

exports.find = () =>{
    return Xe.find({ name: 'hóa đơn điện'});
}

exports.findOne = (id) =>{
    return Xe.findById(id);
}

/* `````````````````````````````````` */