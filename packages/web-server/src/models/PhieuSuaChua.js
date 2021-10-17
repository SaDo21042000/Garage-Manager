exports.initPhieuSuaChua = function(mongoose) {
    
    const Schema = mongoose.Schema;
    
        // Create Bill Schema
        const PhieuSuaChuaSchema = new Schema({
            maPSC: {
                type:String,
                require: true,
                unique: true
            },
            maPTN: {
                type:String,
                require: true
            },
            ngaySC:{
                type:String,
                require: true
            },
            tongTienSC:{
                type: Number,
                require: true
            },
        })
    
        const PhieuSuaChua = mongoose.model('phieusuachuas', PhieuSuaChuaSchema);
    
        return PhieuSuaChua;
    }