import { createStore, applyMiddleware } from 'redux';
import {thunk, ThunkMiddleware } from 'redux-thunk';
import newsReducer from './newsReducer';
import { NewsState, NewsAction } from './types';

const store = createStore(
  newsReducer,
  applyMiddleware(thunk as ThunkMiddleware<NewsState, NewsAction>)
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = (dispatch: AppDispatch, getState: () => RootState) => ReturnType;

export default store;
