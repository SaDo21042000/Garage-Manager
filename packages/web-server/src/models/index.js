const mongoose = require('mongoose');

const { initBill } = require('./Bill');

const db = {};

// Init Models
db.Bill = initBill(mongoose);

module.exports = db;