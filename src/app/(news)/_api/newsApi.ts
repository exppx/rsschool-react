import {
  createApi,
  fetchBaseQuery,
  type FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import type { Article, NewsApiResponse } from '@/app/(news)/_types';

export const newsApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.BASE_NEWS_API_URL,
    prepareHeaders: (headers) => {
      headers.set('X-Api-Key', process.env.NEWS_API_KEY ?? '');
      return headers;
    },
  }),
  tagTypes: ['News'],
  keepUnusedDataFor: Number(process.env.NEXT_PUBLIC_CACHE_TIME_TO_LIVE ?? 60),
  endpoints: (builder) => ({
    getNews: builder.query<NewsApiResponse, { query: string; page: string }>({
      query: (options) => {
        let url = `top-headlines?country=us&pageSize=10&page=${options.page}`;

        if (options.query !== '') {
          url = `everything?q=${options.query}&searchIn=title&pageSize=10&page=${options.page}`;
        }

        return url;
      },
      providesTags: (result) =>
        result
          ? [
              ...result.articles.map(
                ({ title }) => ({ type: 'News', id: title }) as const
              ),
              { type: 'News', id: 'LIST' },
            ]
          : [{ type: 'News', id: 'LIST' }],
    }),

    getNewsByDetails: builder.query<
      Article | undefined,
      string,
      NewsApiResponse
    >({
      query: (details) => {
        return `everything?q=${details}&searchIn=title&pageSize=1&page=1`;
      },
      transformResponse: (response) => {
        return response.articles[0];
      },
      providesTags: (_, __, id) => [{ type: 'News', id }],
    }),

    getNewsByDetailsList: builder.query<Article[], string[]>({
      async queryFn(detailsList, _, __, fetchWithBQ) {
        try {
          const results: (Article | undefined)[] = await Promise.all(
            detailsList.map(async (details) => {
              const result = await fetchWithBQ(
                `everything?q=${details}&searchIn=title&pageSize=1&page=1`
              );

              if (result.error) {
                throw result.error;
              }

              const data = result.data as NewsApiResponse;

              return data.articles[0];
            })
          );

          return { data: results.filter((article) => article !== undefined) };
        } catch (error) {
          return {
            error: error as FetchBaseQueryError,
          };
        }
      },
    }),
  }),
});

export const {
  useGetNewsQuery,
  useGetNewsByDetailsQuery,
  useLazyGetNewsByDetailsListQuery,
} = newsApi;
