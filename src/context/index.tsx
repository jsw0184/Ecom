import React from 'react';

const EcomContext = React.createContext();

const EcomProvider = ({children}) => {
  <EcomContext.Provider>{children}</EcomContext.Provider>;
};

export default EcomProvider;
