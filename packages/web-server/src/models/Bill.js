exports.initBill = function(mongoose) {
    const Schema = mongoose.Schema;

    // Create Bill Schema
    const BillSchema = new Schema({
        name: {
            type:String,
        },
        description:{
            type:String
        },
    })

    // Create Bill Model
    const Bill = mongoose.model('bills', BillSchema);

    return Bill;
}