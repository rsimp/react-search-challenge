import { registerSlice } from 'core/AppState';
import loginReducer from './reducer';

registerSlice('login', loginReducer);
