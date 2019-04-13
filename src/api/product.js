import axios from 'axios';
let baseURL = process.env.REACT_APP_BASE_URL || "http://localhost:5060";
export const apiSaveProduct = product=>{
    return axios.post(`${baseURL}/api/product`,product,{headers: {'Access-Control-Allow-Origin': '*'}});
} 
export const apiFetchProduct = (url)=>{
    return axios.get(`${baseURL}${url}`);
}
export const apiEditProduct = (url,content)=>{
    return axios.put(`${baseURL}${url}`,content,{headers: {'Access-Control-Allow-Origin': '*'}});
}
export const apiDeleteProduct = (url)=>{
    return axios.delete(`${baseURL}${url}`,{headers: {'Access-Control-Allow-Origin': '*'}});
}
