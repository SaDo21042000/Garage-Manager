import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'http://localhost:5001/',
    headers: {
        'content-type': 'application/json',
    }
})