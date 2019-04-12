import axios from 'axios';
export const apiSaveProduct = product=>{
    return axios.post('/api/product',product);
} 
export const apiFetchProduct = (url)=>{
    return axios.get(url);
}
export const apiEditProduct = (url,content)=>{
    return axios.put(url,content);
}
export const apiDeleteProduct = (url)=>{
    return axios.delete(url);
}
