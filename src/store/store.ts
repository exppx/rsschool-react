import { configureStore } from '@reduxjs/toolkit';
import { newsReducer } from '@/app/[locale]/(news)/_store';
import { newsApi } from '@/app/[locale]/(news)/_api/newsApi';

export const store = configureStore({
  reducer: {
    news: newsReducer,
    [newsApi.reducerPath]: newsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(newsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
