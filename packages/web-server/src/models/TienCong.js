exports.initTienCong = function(mongoose) {
  const Schema = mongoose.Schema;

  const TienCongSchema = new Schema({
     maTienCong: {
       type:String,
       require: true,
       unique: true
     },
     tienCong: {
       type:Number,
       require: true
     }
  })

  const TienCong = mongoose.model('tiencongs', TienCongSchema);

  return TienCong;
}