exports.initPhieuTiepNhan = function(mongoose) {
    
    const Schema = mongoose.Schema;
    
        // Create Bill Schema
        const PhieuTiepNhanSchema = new Schema({
            maPTN: {
                type:String,
                require: true,
                unique: true
            },
            maXe: {
                type:String,
                require: true
            },
            ngayTN:{
                type:String,
                require: true
            },
        })
    
        const PhieuTiepNhan = mongoose.model('PhieuTiepNhan', PhieuTiepNhanSchema);
    
        return PhieuTiepNhan;
    }