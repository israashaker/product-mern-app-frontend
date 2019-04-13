import {PRODUCT_SAVED,RESET_SAVED_FLAG,FETCHING_PRODUCT,FETCHED_SUCCESS,FETCHED_FAILED,CHAGNE_MONTH,PRODUCT_EDITED,RESET_EDITED_FLAG}from '../actions/types';
import moment from 'moment';
const INITIAL_STATE={
    saved:false,
    fetching:false,
    month:moment().month(),
    product:[],
    edited:false
}
export default (state=INITIAL_STATE,action)=>{
    switch(action.type){
        case FETCHING_PRODUCT:
            return {...state,fetching:true};
        case FETCHED_SUCCESS:
            return {...state,fetching:false,product:action.payload};
        case FETCHED_FAILED:
            return {...state,fetching:false}
        case PRODUCT_SAVED:
            return {...state,saved:true};
        case RESET_SAVED_FLAG:
            return {...state,saved:false};
        case CHAGNE_MONTH:
            return {...state,month:action.payload};
        case PRODUCT_EDITED:
            return {...state,edited:true}
        case RESET_EDITED_FLAG:
            return {...state,edited:false}       
        default:
        return state;
    }
}