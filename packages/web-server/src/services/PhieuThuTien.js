const { PhieuThuTien } = require('../models');

/* `````````````````````````````````` */
// Put your custom services code below this line
exports.create = async (formInput) => {
  // update accessory
  let ptt = await PhieuThuTien.findById(formInput.accessoryId);
  let newRemaining = parseInt(formInput.amount) + accessory.remaining;
  await Accessory.updateOne(
    { _id: formInput.accessoryId },
    { remaining: newRemaining }
  );

  // Create new accessory import form
  let newPTT = await new AccessoryImportForm({
    ...formInput,
  });

  await newPTT.save();

  return newPTT;
};

exports.find = () => {
  return PhieuThuTien.find({}).populate('MaPTT');
};

exports.findOne = (id) => {
  return PhieuThuTien.findOne({ _id: id }).populate('MaPTT');
};
/* `````````````````````````````````` */
