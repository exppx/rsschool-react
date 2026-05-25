import { configureStore } from '@reduxjs/toolkit';
import { newsReducer } from '@news/store';
import { newsApi } from '@/features/news/api/newsApi';

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
