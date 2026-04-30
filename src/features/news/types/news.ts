export type News = {
  title: string;
  description: string;
};

export type NewsApiResponse = {
  status: 'ok';
  totalResults: number;
  articles: Article[];
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
