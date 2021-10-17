exports.initTaiKhoan = function(mongoose) {
  const Schema = mongoose.Schema;

  // Create Bill Schema
  const TaiKhoanSchema = new Schema({
      maTaiKhoan: {
          type:String,
          unique: true,
          require: true
      },
     tenTaiKhoan: {
          type:String,
          require: true
      },
      matKhau: {
        type:String,
        require: true
      },
      quyenHan: {
        type: String,
        enum: ["thêm", "sửa", "xóa", "cập nhật", "null"],
        default: "null"
      }
  })

  // Create TaiKhoan Model
  const TaiKhoan = mongoose.model('taikhoans', TaiKhoanSchema);

  return TaiKhoan;
}