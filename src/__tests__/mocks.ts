import type { Article } from '@/features/news';

export const mockArticle: Article = {
  source: {
    id: '1',
    name: 'Name',
  },
  author: 'Author',
  title: 'Title',
  description: 'Description',
  url: 'url',
  urlToImage: 'url to image',
  publishedAt: '2000-01-01T00:00:00Z',
  content: 'Content',
};

export const mockEmptyArticle: Article = {
  source: {
    id: null,
    name: null,
  },
  author: null,
  title: null,
  description: null,
  url: null,
  urlToImage: null,
  publishedAt: '2000-01-01T00:00:00Z',
  content: null,
};

export const mockNews: Article[] = [
  {
    source: { id: '1', name: 'Source 1' },
    author: 'Author 1',
    title: 'Title 1',
    description: 'Description 1',
    url: 'url 1',
    urlToImage: 'urlToImage 1',
    publishedAt: '2026-04-13T21:25:17Z',
    content: 'Content 1',
  },
  {
    source: { id: '2', name: 'Source 2' },
    author: 'Author 2',
    title: 'Title 2',
    description: 'Description 2',
    url: 'url 2',
    urlToImage: 'urlToImage 2',
    publishedAt: '2026-04-13T21:25:17Z',
    content: 'Content 2',
  },
];

export const mockEmptyNews: Article[] = [];
