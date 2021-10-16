const BillRouter = require('./Bill');
const KhachHangRouter = require('./KhachHang');
const XeRouter = require('./Xe');
const HieuXeRouter = require('./HieuXe');
const ChiTietDoanhSoRouter = require('./ChiTietDoanhSo');

const route = (app) => {
    app.use('/api/bills', BillRouter);
    app.use('/api/khachhangs', KhachHangRouter);
    app.use('/api/xes', XeRouter);
    app.use('/api/hieuxes', HieuXeRouter);
    app.use('/api/chitietdoanhsos', ChiTietDoanhSoRouter);
}


module.exports = route 