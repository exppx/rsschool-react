import { configureStore } from '@reduxjs/toolkit';
import { newsReducer } from '@/app/(news)/_store';
import { newsApi } from '@/app/(news)/_api/newsApi';

export function createTestStore() {
  return configureStore({
    reducer: {
      news: newsReducer,
      [newsApi.reducerPath]: newsApi.reducer,
    },
    middleware: (getDM) => getDM().concat(newsApi.middleware),
  });
}
