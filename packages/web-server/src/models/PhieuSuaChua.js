exports.initPhieuSuaChua = function(mongoose) {
    
    const Schema = mongoose.Schema;
    
        // Create Bill Schema
        const PhieuSuaChuaSchema = new Schema({
            maPTN: { type: Schema.Types.ObjectId, ref: 'phieutiepnhans' },
            ngaySC:{
                type:String,
                require: true
            },
            tongTienSC:{
                type: Number,
                require: true
            },
            isDeleted:{
                type:Number
            },
            maPhieuThuTien:{
                type:String
            },
            
        })
    
        const PhieuSuaChua = mongoose.model('phieusuachuas', PhieuSuaChuaSchema);
    
        return PhieuSuaChua;
    }