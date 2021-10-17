exports.initVatTu = function(mongoose) {
  const Schema = mongoose.Schema;

  const VatTuSchema = new Schema({
     maVatTu: {
       type:String,
       require: true,
       unique: true
     },
     loaiVaTu: {
       type:String,
       require: true
     },
     donGia: {
       type:String,
       require: true
     },
     soLuongCon: {
       type:String,
       require: true
     }
  })

  const VatTu = mongoose.model('vatus', VatTuSchema);

  return VatTu;
}