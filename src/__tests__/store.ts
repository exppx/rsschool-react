import { configureStore } from '@reduxjs/toolkit';
import { newsReducer } from '@/app/[locale]/(news)/_store';

export function createTestStore() {
  return configureStore({
    reducer: {
      news: newsReducer,
    },
  });
}
