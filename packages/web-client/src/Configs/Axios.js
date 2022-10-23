import axios from 'axios';

//baseURL: '',
const baseURLl =
  process.env.NODE_ENV !== 'production'
    ? process.env.REACT_APP_API_URL
    :'https://garage-manager-nodejs-reactjs.herokuapp.com/api'
const baseURL =
  process.env.NODE_ENV !== 'production'
  ?'https://garage-manager-nodejs-reactjs.herokuapp.com/api'
    : process.env.REACT_APP_API_URL

var axiosClient = axios.create({
  //baseURL: process.env.REACT_APP_API_URL,
  baseURL: baseURL,
  // `withCredentials` chỉ định có thực hiện các request cross-site Access-Control sử dụng credential hay không
  withCredentials: false, // mặc định là false,
  headers: {
    'content-type': 'application/json',
    // 'Authorization':"bearer " + JSON.parse(localStorage.getItem('token'))
  },

  // `responseType` chỉ định kiểu dữ liệu mà server sẽ trả về
  // có thể là 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
  //responseType: 'json', // default
});
axiosClient.interceptors.request.use(
  async (config) => {
    // Do something before request is sent
    config.headers['Authorization'] = 'bearer ' + JSON.parse(localStorage.getItem('token'));
    return config;
  },
  (error) => {
    throw error;
  },
);
axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    //handle error here
    throw error;
  },
);

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    //handle error here
    throw error;
  },
);

export default axiosClient;
