import {
    PRODUCT_SAVED,
    RESET_SAVED_FLAG,
    FETCHING_PRODUCT,
    FETCHED_SUCCESS,
    FETCHED_FAILED,
    CHAGNE_MONTH,
    PRODUCT_EDITED,
    RESET_EDITED_FLAG
  } from './types';
  import { addErrorMessage, clearErrorMessages } from './error_actions';
  
  import { apiSaveProduct, apiFetchProduct,apiDeleteProduct,apiEditProduct } from '../api/product';
  
  export const saveProduct = product => {
    return async dispatch => {
      try {
        dispatch(clearErrorMessages());
        await apiSaveProduct(product);
        dispatch({ type: PRODUCT_SAVED });
      } catch (e) {
        dispatch(addErrorMessage(e));
      }
    };
  };
  
  export const fetchProduct = (month) => {
    return async dispatch => {
      try {
        const prefix = '/api/product';
        const url = month?`${prefix}/${month}`:prefix;  
        dispatch({ type: FETCHING_PRODUCT });
        const { data } = await apiFetchProduct(url);
        dispatch({ type: FETCHED_SUCCESS, payload: data.product });
      } catch (e) {
        dispatch({ type: FETCHED_FAILED });
        dispatch(addErrorMessage(e));
      }
    };
  };
  export const EditProduct = (id,content) => {
    const prefix = '/api/product';
    const url = id?`${prefix}/${id}`:prefix;
    return async dispatch => {
      try {
        await apiEditProduct(url,content);
        dispatch({ type: PRODUCT_EDITED});
        //console.log(data);
      } catch (e) {
       
        dispatch(addErrorMessage(e));
      }
    };
  };
  export const DeleteProduct = (id) => {
    const prefix = '/api/product';
    const url = id?`${prefix}/${id}`:prefix;
    return async dispatch => {
      try {
        await apiDeleteProduct(url);
      } catch (e) {
       
        dispatch(addErrorMessage(e));
      }
    };
  };
  
  
  export const ResetMonth = (month) => {
    return {type:CHAGNE_MONTH,payload:month};
  }
  export const resetEdited = () => {
    return {type:RESET_EDITED_FLAG}
  }
  export const resetSaved = () => {
    return {type:RESET_SAVED_FLAG}
  }
  
  //or export const resetSaved = () =>({ type: RESET_SAVED_FLAG })
  