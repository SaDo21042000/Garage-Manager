exports.initChiTietDoanhSo = function(mongoose) {

    const Schema = mongoose.Schema;

    // Create Bill Schema
    const ChiTietDoanhSoSchema = new Schema({
        maCTDS: {
            type:String,
        },
        maHieuXe:{
            type:String
        },
        soLuongSua:{
            type:Number
        },
        tiLe:{
            type:Number
        },
        tongTien:{
            type:Number
        },
        maDoanhSo:{
            type:String
        },
    })

    // Create ChiTietDoanhSo Model
    const ChiTietDoanhSo = mongoose.model('chitietdoanhsos', ChiTietDoanhSoSchema);

    return ChiTietDoanhSo;
}