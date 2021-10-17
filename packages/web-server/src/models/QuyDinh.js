exports.initQuyDinh = function(mongoose) {
  const Schema = mongoose.Schema;

  // Create QuyDinh Schema
  const QuyDinhSchema = new Schema({
     soLuongHX: {
       type:Number,
       require: true
     },
     soXeMax: {
       type:Number,
       require: true
     },
     soLoaiVatTu: {
       type:Number,
       require: true
     },
     soLoaiTienCong: {
       type:Number,
       require: true
     }
  })

  // Create QuyDinh Model
  const QuyDinh = mongoose.model('quydinhs', QuyDinhSchema);

  return QuyDinh;
}