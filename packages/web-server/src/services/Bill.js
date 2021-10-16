const { Bill } = require('../models');

/* `````````````````````````````````` */
// Put your custom services code below this line
exports.create = async input => {
    
    // Create bill base on input
    let newBill = await new Bill({
        ...input
    });
    await newBill.save();

    return newBill;
}

exports.find = () =>{
    return Bill.find({ name: 'hóa đơn điện'});
}

exports.findOne = (id) =>{
    return Bill.findById(id);
}

/* `````````````````````````````````` */