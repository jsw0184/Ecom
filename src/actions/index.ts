import endPoint from '../services/endPoints';
import useEcFetch from '../services/useEcFetch';
import types from './types';
const ecFetch = useEcFetch();

export const emailChanged = text => {
  return {
    type: types.login.EMAIL_CHANGED,
    payload: text,
  };
};

export const passwordChanged = text => {
  return {
    type: types.login.PASSWORD_CHANGED,
    payload: text,
  };
};

export const getCategories = () => {
  return dispatch => {
    ecFetch(endPoint.allCategories).then(data => dispatch({type:types.home.CATEGORIES,payload:data}));
  };
};
