exports.initPhieuTiepNhan = function(mongoose) {
    
    const Schema = mongoose.Schema;
    
        // Create Bill Schema
        const PhieuTiepNhanSchema = new Schema({
            maXe: { type: Schema.Types.ObjectId, ref: 'Xes' },
            ngayTN:{
                type:String,
                require: true
            },
            isDeleted:{
                type:Number
            },
            maPhieuThuTien:{
                type:String
            }
        })
    
        const PhieuTiepNhan = mongoose.model('phieutiepnhans', PhieuTiepNhanSchema);
    
        return PhieuTiepNhan;

        
    }