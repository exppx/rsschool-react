import { default as usersReducer } from '@/store/usersSlice';
import { configureStore } from '@reduxjs/toolkit';

export function createTestStore() {
  return configureStore({
    reducer: {
      users: usersReducer,
    },
  });
}
