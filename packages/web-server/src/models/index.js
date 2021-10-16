const mongoose = require('mongoose');

const { initBill } = require('./Bill');
const { initKhachHang } = require('./KhachHang');
const { initHieuXe } = require('./HieuXe');
const { initXe } = require('./Xe');
const { initChiTietDoanhSo } = require('./ChiTietDoanhSo');

const db = {};

// Init Models
db.Bill = initBill(mongoose);

// Init Models
db.KhachHang = initKhachHang(mongoose);
db.Xe = initXe(mongoose);
db.HieuXe = initHieuXe(mongoose);
db.ChiTietDoanhSo = initChiTietDoanhSo(mongoose);

module.exports = db;