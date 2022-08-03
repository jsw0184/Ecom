import {CategoriesModel} from '../models/categories';
import ContextReusable from './ContextReusable';

const categoryReducer = (state, action) => {
  switch (action.type) {
    case 'add_categories':
      return [...action.payload];
    default:
      return state;
  }
};

const setCategories = dispatch => {
  return (data: CategoriesModel[]) => {
    dispatch({type: 'add_categories', payload: data});
  };
};

export const {Context, Provider} = ContextReusable(
  categoryReducer,
  {setCategories},
  [],
);
