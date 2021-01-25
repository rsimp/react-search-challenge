import { registerSlice } from 'core/AppState';
import searchReducer from './reducer';

registerSlice('search', searchReducer);
