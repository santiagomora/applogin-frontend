import axios from 'axios';

const API_URL = 'http://127.0.0.1:8080'//process.env.API_URL
const API_TIMEOUT = 8000//process.env.API_TIMEOUT
 
console.log(API_URL)

export const GET = (options) => axios({
    method:'get',
    timeout: API_TIMEOUT,
    baseURL: API_URL,
    crossDomain: true,
    ...options,
    headers: {
        'Accept':'application/json',
        ...(options.headers || {})
    }
})

export const POST = (options) => axios({
    method: 'post',
    timeout: API_TIMEOUT,
    baseURL: API_URL,
    crossDomain: true,
    ...options,
    headers: {
        'Content-type':'application/json',
        'Accept':'application/json',
        ...(options.headers || {})
    },
})

export const DELETE = (options) => axios({
    method: 'delete',
    timeout: API_TIMEOUT,
    baseURL: API_URL,
    ...options,
    headers: {
        'Content-type':'application/json',
        'Accept':'application/json',
        ...(options.headers || {})
    }
})

export const PUT = (options) => axios({
    method: 'put',
    timeout: API_TIMEOUT,
    baseURL: API_URL,
    crossDomain: true,
    ...options,
    headers: {
        'Content-type':'application/json',
        'Accept':'application/json',
        ...(options.headers || {})
    }
})

// axios.interceptors.request.use(
//     function (config) {
//         return config;
//     },
//     function (error) {
//         return Promise.reject(error);
//     }
// );
// 
// axios.interceptors.response.use(
//     function (config) {
//         return config;
//     },
//     function (error) {
//         return Promise.reject(error);
//     }
// );
