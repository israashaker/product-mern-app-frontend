import axios from 'axios';
export const apiLogin = request_data=>{
    return axios.post('/api/auth',request_data);
}
export const apiSignUp = request_data=>{
    return axios.post('/api/register',request_data);
}
export const getProfile = ()=>{
    return axios.get('/api/me');
}