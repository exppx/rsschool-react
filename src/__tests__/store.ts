import { configureStore } from '@reduxjs/toolkit';
import { newsReducer } from '@news/store';

export function createTestStore() {
  return configureStore({
    reducer: {
      news: newsReducer,
    },
  });
}
