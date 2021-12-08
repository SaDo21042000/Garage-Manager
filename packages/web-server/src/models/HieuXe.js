exports.initHieuXe = function(mongoose) {
    const Schema = mongoose.Schema;

    // Create Bill Schema
    const HieuXeSchema = new Schema({
        maHieuXe: {
            type:String,
            unique: true
        },
       tenHieuXe: {
            type:String,
            unique: true
        }
    })

    // Create HieuXe Model
    const HieuXe = mongoose.model('hieuxes', HieuXeSchema);

    return HieuXe;
}