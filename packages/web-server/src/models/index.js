const mongoose = require('mongoose');

const { initBill } = require('./Bill');
const { initKhachHang } = require('./KhachHang');
const { initHieuXe } = require('./HieuXe');
const { initXe } = require('./Xe');
const { initChiTietDoanhSo } = require('./ChiTietDoanhSo');
const { initTaiKhoan } = require('./TaiKhoan');
const { initQuyDinh } = require('./QuyDinh')
const { initChiTietSuaChua } = require('./ChiTietSuaChua');
const { initVatTu } = require('./VatTu');
const { initPhieuNhapVatTu } = require('./PhieuNhapVatTu');
const { initChiTietBaoCaoTon } = require('./ChiTietBaoCaoTon');
const { initBaoCaoTon } = require('./BaoCaoTon');

const db = {};

// Init Models
db.Bill = initBill(mongoose);

// Init Models
db.KhachHang = initKhachHang(mongoose);
db.Xe = initXe(mongoose);
db.HieuXe = initHieuXe(mongoose);
db.ChiTietDoanhSo = initChiTietDoanhSo(mongoose);
db.TaiKhoan = initTaiKhoan(mongoose);
db.QuyDinh = initQuyDinh(mongoose)
db.ChiTietSuaChua = initChiTietSuaChua(mongoose)
db.VatTu = initVatTu(mongoose)
db.PhieuNhapVatTu = initPhieuNhapVatTu(mongoose)
db.ChiTietBaoCaoTon = initChiTietBaoCaoTon(mongoose)
db.BaoCaoTon = initBaoCaoTon(mongoose)


module.exports = db;