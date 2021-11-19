const BillRouter = require('./Bill');
const KhachHangRouter = require('./KhachHang');
const XeRouter = require('./Xe');
const HieuXeRouter = require('./HieuXe');
const ChiTietDoanhSoRouter = require('./ChiTietDoanhSo');
const TaiKhoanRouter = require('./TaiKhoan');
const QuyDinhRouter = require('./QuyDinh');
const LoaiVatTuRouter = require('./LoaiVatTu');
const {isAdminAuth}=require('../middlewares/AuthMiddleware')
const AccessoryRouter = require('./Accessory');
const WageRouter = require('./Wage');
const ParameterRouter = require('./Parameter');
const AccessoryImportFormRouter = require('./AccessoryImportForm');
const InventoryReportRouter = require('./InventoryReport');
const PhieuTiepNhan = require('./PhieuTIepNhan');

const route = (app) => {
    app.use('/api/bills', BillRouter);
    app.use('/api/khachhangs', KhachHangRouter);
    app.use('/api/xes', XeRouter);
    app.use('/api/hieuxes', HieuXeRouter);
    app.use('/api/chitietdoanhsos', ChiTietDoanhSoRouter);
    app.use('/api/taikhoans', TaiKhoanRouter);
    app.use('/api/quydinhs',isAdminAuth, QuyDinhRouter);
    app.use('/api/loaivattus', LoaiVatTuRouter);
    app.use('/api/wages', WageRouter);
    app.use('/api/parameters', ParameterRouter);
    app.use('/api/accessories', AccessoryRouter);
    app.use('/api/accessory-import-forms', AccessoryImportFormRouter);
    app.use('/api/inventory-reports', InventoryReportRouter);
    app.use('/api/phieutiepnhan', PhieuTiepNhan);
}


module.exports = route 