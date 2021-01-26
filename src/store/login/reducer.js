import { combineReducers } from '@reduxjs/toolkit';
import { valueReducer } from '../reducer-helpers';

export default combineReducers({
  authToken: valueReducer('Bearer: a98d20989'),
});
