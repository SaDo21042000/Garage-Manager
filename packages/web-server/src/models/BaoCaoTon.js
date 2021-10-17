exports.initBaoCaoTon = function(mongoose) {
  const Schema = mongoose.Schema;

  const BaoCaoTonSchema = new Schema({
     maBCT: {
       type:String,
       require: true,
       unique: true
     },
     thoiDiemBCT: {
      type:Date,
      require: true
     }
  })

  const BaoCaoTon = mongoose.model('baocaotons', BaoCaoTonSchema);

  return BaoCaoTon;
}