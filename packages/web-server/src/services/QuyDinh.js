const { QuyDinh } = require('../models');

/* `````````````````````````````````` */
// Put your custom services code below this line
exports.create = async input => {
    
    // Create QuyDinh base on input
    let newQuyDinh = await new QuyDinh({
        ...input
    });
    await newQuyDinh.save();

    return newQuyDinh;
}

exports.find = () =>{
    return QuyDinh.find();
}

exports.findByID = (id) =>{
    return QuyDinh.findById(id);
}

exports.findOne = (obj) =>{
    return QuyDinh.findOne(obj);
}

exports.update = (clause,input) =>{
    return QuyDinh.updateOne(clause,input);
}

/* `````````````````````````````````` */