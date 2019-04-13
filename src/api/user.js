import axios from 'axios';
let baseURL = process.env.REACT_APP_BASE_URL || "http://localhost:5060";
export const apiLogin = request_data=>{
    return axios.post(`${baseURL}/api/auth`,request_data,{headers: {'Access-Control-Allow-Origin': '*'}});
}
export const apiSignUp = request_data=>{
    return axios.post(`${baseURL}/api/register`,request_data,{headers: {'Access-Control-Allow-Origin': '*'}});
}
export const getProfile = ()=>{
    return axios.get(`${baseURL}/api/me`,{headers: {'Access-Control-Allow-Origin': '*'}});
}