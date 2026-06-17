'use server';

import { convertArrayOfObjectsToCsv } from '@/utils/csv/convertArrayOfObjectsToCsv';
import type { Article, NewsApiResponse } from '../_types';

export async function downloadNews(
  _: { error: string | null; csv?: string; fileName?: string },
  formData: FormData
) {
  const detailsList = JSON.parse(formData.get('detailsList') as string);

  if (!detailsList) return { error: 'No data' };
  if (
    !Array.isArray(detailsList) ||
    !detailsList.every((detail) => typeof detail === 'string')
  )
    return { error: 'Invalid data' };

  try {
    const results: (Article | undefined)[] = await Promise.all(
      detailsList.map(async (details) => {
        const result = await fetch(
          `${process.env.BASE_NEWS_API_URL}everything?q=${details}&searchIn=title&pageSize=1&page=1`,
          {
            headers: {
              'X-Api-Key': process.env.NEWS_API_KEY ?? '',
            },
          }
        );

        if (!result.ok) {
          return;
        }

        const data: NewsApiResponse = await result.json();

        return data.articles[0];
      })
    );

    const clearArticles = results.filter((article) => article !== undefined);
    const csv = convertArrayOfObjectsToCsv(clearArticles);

    return {
      error: null,
      csv,
      fileName: `${detailsList.length}_news.csv`,
    };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : 'Unknown error',
      csv: undefined,
      fileName: undefined,
    };
  }
}
