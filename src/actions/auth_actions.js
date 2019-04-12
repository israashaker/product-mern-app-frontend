import {AUTH_ATTEMPTING, AUTH_SUCCESS,AUTH_FAILED,USER_LOGGEDOUT, PROFILE_FETCHED, USER_REGISTER} from './types';
import {apiLogin,getProfile, apiSignUp} from '../api/user';
import AuthHeader from '../api/setAuthHeader';
const TOKEN_NAME = 'product_app_token';
export const signIn = requset_data =>{
    return async dispatch=>{
        dispatch({type:AUTH_ATTEMPTING});
        try{
            const {data:{token}} = await apiLogin(requset_data);
            AuthHeader(token);
            dispatch(fetchProfile())
            // console.log(data)
            // dispatch(success(data.token));
            dispatch(success(token));
        }catch(e){

            //console.error(e.response);
           // dispatch(error(e.response.data.error))
           const {response:{data}}=e;
           dispatch(error(data.error))
        }
    }
}
export const signUp = requset_data =>{
    return async dispatch=>{
        dispatch({type:AUTH_ATTEMPTING});
        try{
            const {data} = await apiSignUp(requset_data);
           
           dispatch({type:USER_REGISTER,payload:data.user})
            
        }catch(e){

            //console.error(e.response);
           // dispatch(error(e.response.data.error))
           const {response:{data}}=e;
           dispatch(error(data.error))
        }
    }
}

export const checkOnloadingLogin=()=>{
    return dispatch =>{
        try{
            const token = localStorage.getItem(TOKEN_NAME);
            if(token === null || token ==='undefined'){
                return dispatch(error('You need to login'));
            }
            AuthHeader(token);
            dispatch(fetchProfile())
            dispatch(success(token));
        }catch(e){
            console.error(e);
        }
    }
}
export const fetchProfile = ()=>{
    return async dispatch=>{
        try{
            const {data:{user}} = await getProfile();
            //console.log(user);
            dispatch({type:PROFILE_FETCHED,payload:user});
        }catch(e){
            console.error(e)
        }
    }
}
export const logUserOut =()=>{
    localStorage.clear();
    return({type:USER_LOGGEDOUT})
}
const success = (token)=>{
    localStorage.setItem(TOKEN_NAME,token);
    return {type:AUTH_SUCCESS};
}
const error=(error)=>{
    return {type:AUTH_FAILED,payload:error}
}