import { createTestStore } from '@/__tests__/store';
import { mockArticle } from '@/__tests__/mocks';
import { newsApi } from './newsApi';

describe('newsApi', () => {
  function setup(reject?: boolean) {
    if (!reject) {
      window.fetch = vi.fn().mockImplementation(() =>
        Promise.resolve(
          new Response(
            JSON.stringify({
              articles: [mockArticle],
            }),
            {
              status: 200,
              headers: {
                'Content-Type': 'application/json',
              },
            }
          )
        )
      );
    } else {
      window.fetch = vi.fn().mockImplementation(() =>
        Promise.resolve(
          new Response(JSON.stringify({}), {
            status: 500,
            headers: {
              'Content-Type': 'application/json',
            },
          })
        )
      );
    }

    const store = createTestStore();

    return { store };
  }

  it('should return articles on getNews call with query', async () => {
    const { store } = setup();

    const result = await store
      .dispatch(
        newsApi.endpoints.getNews.initiate({ query: 'test', page: '1' })
      )
      .unwrap();

    expect(result.articles[0].title).toEqual(mockArticle.title);
    expect(window.fetch).toHaveBeenCalled();
  });

  it('should return articles on getNews call without query', async () => {
    const { store } = setup();

    const result = await store
      .dispatch(newsApi.endpoints.getNews.initiate({ query: '', page: '1' }))
      .unwrap();

    expect(result.articles[0].title).toEqual(mockArticle.title);
    expect(window.fetch).toHaveBeenCalled();
  });

  it('should return cached articles on repetitive getNews call', async () => {
    const { store } = setup();

    await store.dispatch(
      newsApi.endpoints.getNews.initiate({ query: 'test', page: '1' })
    );
    await store.dispatch(
      newsApi.endpoints.getNews.initiate({ query: 'test', page: '1' })
    );

    expect(window.fetch).toHaveBeenCalledOnce();
  });

  it('should return article on getNewsByDetails call', async () => {
    const { store } = setup();

    const result = await store
      .dispatch(newsApi.endpoints.getNewsByDetails.initiate('Test'))
      .unwrap();

    expect(result?.title).toEqual(mockArticle.title);
    expect(window.fetch).toHaveBeenCalled();
  });

  it('should return cached article on repetitive getNewsByDetails call', async () => {
    const { store } = setup();

    await store.dispatch(newsApi.endpoints.getNewsByDetails.initiate('Test'));
    await store.dispatch(newsApi.endpoints.getNewsByDetails.initiate('Test'));

    expect(window.fetch).toHaveBeenCalledOnce();
  });

  it('should return array of articles on getNewsByDetailsList call', async () => {
    const detailsArray = ['test1', 'test2', 'test3'];
    const { store } = setup();

    const result = await store
      .dispatch(newsApi.endpoints.getNewsByDetailsList.initiate(detailsArray))
      .unwrap();

    expect(result).toHaveLength(3);
    expect(result[1].title).toEqual(mockArticle.title);
    expect(window.fetch).toHaveBeenCalledTimes(3);
  });

  it('should return error on unsuccessful getNewsByDetailsList call', async () => {
    const detailsArray = ['test1', 'test2', 'test3'];
    const { store } = setup(true);

    await expect(
      store
        .dispatch(newsApi.endpoints.getNewsByDetailsList.initiate(detailsArray))
        .unwrap()
    ).rejects.toMatchObject({ status: 500 });

    expect(window.fetch).toHaveBeenCalledTimes(3);
  });

  it('should return cached array of articles on repetitive getNewsByDetailsList call', async () => {
    const detailsArray = ['test1', 'test2', 'test3'];
    const { store } = setup();

    await store.dispatch(
      newsApi.endpoints.getNewsByDetailsList.initiate(detailsArray)
    );
    await store.dispatch(
      newsApi.endpoints.getNewsByDetailsList.initiate(detailsArray)
    );

    expect(window.fetch).toHaveBeenCalledTimes(3);
  });
});
