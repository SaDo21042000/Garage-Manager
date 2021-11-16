const { PhieuThuTien, Xe, HieuXe, DoanhSo } = require('../models');

/* `````````````````````````````````` */
// Put your custom services code below this line
exports.create = async formInput => {
    // let month = formInput.NgayTT.getMonth();

    let xe = await Xe.findOne({ bienSo: formInput.bienSo }, { maHieuXe: 1, bienSo: 1, tienNo: 1 });
    // let { id } = await Xe.findOne({ ThoiDiemBaoCao: month }, { _id: 1 });
    // await Accessory.updateOne({ _id: formInput.accessoryId} , { remaining: newRemaining });

    if(!xe) {
        return Promise.reject({ message: 'Xe not found' })
    }

    if(formInput.soTienThu > xe.tienNo) {
        return Promise.reject({ message: 'Too much money' })
    }

    let newPTT = await new PhieuThuTien({
        ...formInput
    });

    await Xe.updateOne({ bienSo: formInput.bienSo } , { tienNo: xe.tienNo - formInput.soTienThu });

    await newPTT.save();

//     DoanhSo.aggregate({$project: {userID: 1, month: {$month: '$createdAt'}, year: { $year: '$createdAt'}}}, 
// { $match: {month: 5, year: 2021} })
    
// insert({'maPTT': '1', 'NgayTT': ISODate('2021-11-11'), 'SoTienThu': 100000})
    return newPTT;
}

exports.find = () => {
    return PhieuThuTien.find({});
}

exports.findOne = (id) => {
    return PhieuThuTien.findOne({ _id: id }).populate('MaPTT');
}
/* `````````````````````````````````` */