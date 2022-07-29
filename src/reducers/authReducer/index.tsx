import types from '../../actions/types';

const initialState = {email: '', password: ''};
export default (state = initialState, action) => {
  switch (action.type) {
    case types.login.EMAIL_CHANGED:
      return {...state, email: action.payload};
    case types.login.PASSWORD_CHANGED:
      return {...state, password: action.payload};
    default:
      return state;
  }
};
