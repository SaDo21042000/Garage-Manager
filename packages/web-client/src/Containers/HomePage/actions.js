
import axios from './../../Configs/Axios'

export const onGetDataTodayRequest=async ()=>{
    return new Promise( async(resolve, reject) => {
        try{
            const res= await axios.get("/home/getInfoToday");;
            resolve(res)
        }catch(e){
            reject(e);
        }
    })
    
}
