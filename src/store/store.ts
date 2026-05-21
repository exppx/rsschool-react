import { configureStore } from '@reduxjs/toolkit';
import { newsReducer } from '@news/store';

export const store = configureStore({
  reducer: {
    newsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
