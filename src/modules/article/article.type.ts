export interface ArticleContent {
  title: string;
  content: string;
  excerpt: string;
  image?: string;
  publishedAt?: string;
  author?: string;
}

export interface ArticleQuery {
  url: string;
}