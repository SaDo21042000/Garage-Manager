const BillRouter = require('./Bill');
const KhachHangRouter = require('./KhachHang');
const XeRouter = require('./Xe');
const HieuXeRouter = require('./HieuXe');
const ChiTietDoanhSoRouter = require('./ChiTietDoanhSo');
const TaiKhoanRouter = require('./TaiKhoan');
const QuyDinhRouter = require('./QuyDinh');
const LoaiVatTuRouter = require('./LoaiVatTu');
const {isAdminAuth}=require('../middlewares/AuthMiddleware')

const route = (app) => {
    app.use('/api/bills', BillRouter);
    app.use('/api/khachhangs', KhachHangRouter);
    app.use('/api/xes', XeRouter);
    app.use('/api/hieuxes', HieuXeRouter);
    app.use('/api/chitietdoanhsos', ChiTietDoanhSoRouter);
    app.use('/api/taikhoans', TaiKhoanRouter);
    app.use('/api/quydinhs',isAdminAuth, QuyDinhRouter);
    app.use('/api/loaivattus',isAdminAuth , LoaiVatTuRouter);
}


module.exports = route 