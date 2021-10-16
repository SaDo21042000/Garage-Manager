const BillRouter = require('./Bill');

const route = (app) => {
    app.use('/api/bills', BillRouter)
}

module.exports = route 