import axios from 'axios';

const axiosClient = axios.create({
    //baseURL: 'http://localhost:5001/',
    //baseURL: 'https://garage-manager-nodejs-reactjs.herokuapp.com/',
    headers: {
        'content-type': 'application/json',
    }
})