import axios from 'axios'

var axiosClient = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}`,
    // `withCredentials` chỉ định có thực hiện các request cross-site Access-Control sử dụng credential hay không
    withCredentials: false, // mặc định là false,
    headers: {'content-type': 'application/json'},
    // `responseType` chỉ định kiểu dữ liệu mà server sẽ trả về
    // có thể là 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
    //responseType: 'json', // default
    });
    axiosClient.interceptors.request.use(async (config)=>{
        //handle token here 
        return config;
    })
    axiosClient.interceptors.response.use((response)=>{
        if(response && response.data){
            return response.data;
        }
        return response;
    },(error)=>{
        //handle error here
        throw error;
    })

export default axiosClient;