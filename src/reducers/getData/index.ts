import types from '../../actions/types';

const initialState = {
  categories: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.home.CATEGORIES:
      return {...state, categories: action.payload};
    default:
      return state;
  }
};
