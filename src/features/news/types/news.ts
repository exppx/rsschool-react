export type News = {
  title: string;
  description: string;
};

export type NewsApiResponse = NewsApiSuccessfulResponse | NewsApiErrorResponse;

export type NewsApiSuccessfulResponse = {
  status: 'ok';
  totalResults: number;
  articles: Article[];
};

export type NewsApiErrorResponse = {
  status: 'error';
  code: string;
  message: string;
};

export type Article = {
  source: {
    id: string | null;
    name: string | null;
  };
  author: string | null;
  title: string | null;
  description: string | null;
  url: string | null;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
};
