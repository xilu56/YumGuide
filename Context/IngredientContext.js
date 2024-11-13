import React, { createContext } from 'react';

export const IngredientContext = createContext();

export const IngredientProvider = ({ children }) => {
  return (
    <IngredientContext.Provider value={{}}>
      {children}
    </IngredientContext.Provider>
  );
};