exports.initPhieuNhapVatTu = function(mongoose) {
  const Schema = mongoose.Schema;

  const PhieuNhapVatTuSchema = new Schema({
     maPNVT: {
       type:String,
       require: true,
       unique: true
     },
     maVaTu: {
       type:String,
       require: true
     },
     soLuongNhap: {
       type:String,
       require: true
     },
     thoiDiemNhap: {
       type:String,
       require: true
     }
  })

  const PhieuNhapVatTu = mongoose.model('phieunhapvattus', PhieuNhapVatTuSchema);

  return PhieuNhapVatTu;
}