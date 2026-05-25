import { configureStore } from '@reduxjs/toolkit';
import { newsReducer } from '@news/store';
import { newsApi } from '@/features/news/api/newsApi';

export function createTestStore() {
  return configureStore({
    reducer: {
      news: newsReducer,
      [newsApi.reducerPath]: newsApi.reducer,
    },
    middleware: (getDM) => getDM().concat(newsApi.middleware),
  });
}
