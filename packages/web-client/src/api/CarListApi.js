import axios from "./../../Configs/Axios";

export const onGetNumberPlate=(bienSo)=>{
  return new Promise( async(resolve, reject) => {
    try{
      const data = await axios.get(`/api/car-list/search?number?plate=${bienSo}`);
      resolve(data);
    } catch(e){
      reject(e.response)
    }
  })
}

export const onGetName=(tenKhachHang)=>{
  return new Promise( async(resolve, reject) => {
    try{
      const data = await axios.get(`/api/car-list/search?name=${tenKhachHang}`);
      resolve(data);
    } catch(e){
      reject(e.response)
    }
  })
}

export const onGetPhone=(soDT)=>{
  return new Promise( async(resolve, reject) => {
    try{
      const data = await axios.get(`/api/car-list/search?phone=${soDT}`);
      resolve(data);
    } catch(e){
      reject(e.response)
    }
  })
}