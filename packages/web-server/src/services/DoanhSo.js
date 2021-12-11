const { DoanhSo } = require('../models');

/* `````````````````````````````````` */
// Put your custom services code below this line
// exports.create = async input => {
    
//     // Create ChiTietDoanhSo base on input
//     let newChiTietDoanhSo = await new ChiTietDoanhSo({
//         ...input
//     });
//     await newChiTietDoanhSo.save();

//     return newChiTietDoanhSo;
// }

// exports.find = () =>{
//     return ChiTietDoanhSo.find({ name: 'hóa đơn điện'});
// }

exports.findOne = async (query) =>{
    try{
        let ds = await DoanhSo.aggregate([{$project: { month: {$month: '$ThoiDiemDS'}, year: { $year: '$ThoiDiemDS'}, tongDS: 1}}, 
        {$match: { month: parseInt(query.month), year: parseInt(query.year)}}]);
        return ds;
    }catch(e){
        console.log(e);
        throw e;
    }
}

/* `````````````````````````````````` */