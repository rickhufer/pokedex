import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducer';
import thunkMiddleware from 'redux-thunk';

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunkMiddleware],
  devTools: import.meta.env.NODE_ENV !== 'production',
});

export default store;
