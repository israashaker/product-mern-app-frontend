import {combineReducers} from 'redux';
import auth from './auth_reducer';
import productv1 from './product_reducer';
import errors from './error_reducer';
export default combineReducers({
    auth,
    productv1,
    errors
})