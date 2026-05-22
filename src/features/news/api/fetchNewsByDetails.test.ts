import type { Mock } from 'vitest';
import { BASE_NEWS_API_URL, NEWS_API_KEY } from '@/constants/api';
import { mockEmptyNews, mockNews } from '@/__tests__/mocks';
import { fetchNewsByDetails } from './fetchNewsByDetails';

describe('fetchNewsByDetails', () => {
  let fetchMock: Mock;

  beforeEach(() => {
    vi.restoreAllMocks();
    fetchMock = vi.spyOn(window, 'fetch');
  });

  it('should call fetch with proper url', () => {
    const details = 'details';
    fetchMock.mockResolvedValue({
      ok: true,
      status: 200,
      json: () => Promise.resolve(mockNews),
    });

    fetchNewsByDetails(details);

    expect(fetchMock).toHaveBeenCalledExactlyOnceWith(
      `${BASE_NEWS_API_URL}/everything?q=${details}&searchIn=title&pageSize=1&page=1`,
      { headers: { 'X-Api-Key': NEWS_API_KEY }, method: 'GET' }
    );
  });

  it('should return news details', async () => {
    const details = 'details';
    fetchMock.mockResolvedValue({
      ok: true,
      status: 200,
      json: () => Promise.resolve(mockNews),
    });

    const article = await fetchNewsByDetails(details);

    expect(article).toEqual(mockNews.articles[0]);
  });

  it('should throw if fetch response status 4xx', async () => {
    fetchMock.mockResolvedValue({
      ok: false,
      status: 404,
      json: () => Promise.resolve(mockEmptyNews),
    });

    await expect(fetchNewsByDetails('details')).rejects.toThrow();
  });

  it('should throw if fetch response status 5xx', async () => {
    fetchMock.mockResolvedValue({
      ok: false,
      status: 500,
      json: () => Promise.resolve(mockEmptyNews),
    });

    await expect(fetchNewsByDetails('details')).rejects.toThrow();
  });

  it('should not throw on non 4xx/5xx response', async () => {
    fetchMock.mockResolvedValue({
      ok: false,
      status: 302,
      json: () => Promise.resolve(mockNews),
    });

    const article = await fetchNewsByDetails('details');

    expect(article).toEqual(mockNews.articles[0]);
  });

  it('should return undefined if no article found', async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      status: 200,
      json: () => Promise.resolve(mockEmptyNews),
    });

    const article = await fetchNewsByDetails('details');

    expect(article).toBeUndefined();
  });
});
