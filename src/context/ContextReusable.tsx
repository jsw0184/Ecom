import React, {useReducer} from 'react';

export default (reducer, actions, intialState) => {
  const Context = React.createContext();

  const Provider = ({children}) => {
    const [state, dispacth] = useReducer(reducer, intialState);

    const boundActions={};
    for(let key in actions)
    {
        boundActions[key]=actions[key](dispacth);
    }

    return <Context.Provider value={{state,...boundActions}}>{children}</Context.Provider>;
  };

  return {Context, Provider};
};
