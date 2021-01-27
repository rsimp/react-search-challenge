import React from 'react';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import ProfilesReducer from './profiles/reducer';
import LoginReducer from './login/reducer';

const rootRecuer = combineReducers({
  profiles: ProfilesReducer,
  login: LoginReducer,
});

export function StoreProvider(props) {
  const store = configureStore({
    reducer: rootRecuer,
  });
  return <Provider store={store}>{props.children}</Provider>;
}
