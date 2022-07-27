import React from 'react';

const EcomContext = React.createContext();

export const EcomProvider = ({children}) => {
  return <EcomContext.Provider value={5}>{children}</EcomContext.Provider>;
};

export default EcomContext;
