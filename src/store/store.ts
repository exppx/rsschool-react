import { configureStore } from '@reduxjs/toolkit';
import { default as usersReducer } from './usersSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
