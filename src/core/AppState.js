import React from 'react';
import { combineReducers } from '@reduxjs/toolkit';

const reducerSlices = {};
export const registerSlice = (name, reducer) => {
  reducerSlices[name] = reducer;
};

export const AppStateContext = React.createContext();

// this part might as well just use redux now :)
function AppStateContextProvider({ children }) {
  const rootReducer = combineReducers(reducerSlices);
  const initialState = rootReducer(undefined, { type: '__initialize__' });
  const [state, dispatch] = React.useReducer(rootReducer, initialState);

  return (
    <AppStateContext.Provider value={{ ...state, dispatch }}>{children}</AppStateContext.Provider>
  );
}

export default AppStateContextProvider;
