exports.initPhieuThuTien = function (mongoose) {
  const Schema = mongoose.Schema;

  // Create Bill Schema
  const PhieuThuTienSchema = new Schema({
    maPTT: {
      type: String,
      require: true,
      unique: true,
    },
    maXe: {
      type: String,
      require: true,
    },
    ngayTT: {
      type: String,
      require: true,
    },
    soTienThu: {
      type: Number,
      require: true,
    },
  });

  const PhieuThuTien = mongoose.model('phieuthutiens', PhieuThuTienSchema);

  return PhieuThuTien;
};
