import {combineReducers} from 'redux';
import authReducer from './authReducer';
import getData from './getData';
export default combineReducers({
  auth: authReducer,
  data: getData,
});
