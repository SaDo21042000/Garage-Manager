exports.initChiTietBaoCaoTon = function(mongoose) {
  const Schema = mongoose.Schema;

  const ChiTietBaoCaoTonSchema = new Schema({
     maCTBCT: {
       type:String,
       require: true,
       unique: true
     },
     maVaTu: {
       type:String,
       require: true,
     },
     tonDau: {
       type:Number,
       require: true
     },
     phatSinh: {
       type:Number,
       require: true
     },
     tonCuoi: {
       type:Number,
       require: true
     },
     maBCT: {
       type: String,
       require: true
     }
  })

  const ChiTietBaoCaoTon = mongoose.model('chitietbaocaotons', ChiTietBaoCaoTonSchema);

  return ChiTietBaoCaoTon;
}