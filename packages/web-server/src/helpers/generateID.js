
const ramdom=()=>{
    return  Math.floor(Math.random()*1000);
}
exports.generateID=(prefix)=>{
    return prefix+'-'+ramdom()+'-'+ramdom()+'-'+ramdom();
}
