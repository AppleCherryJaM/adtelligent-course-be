export interface FeedItem {
  title: string;
  link: string;
  pubDate: string;
  content: string;
  contentSnippet: string;
  guid: string;
  isoDate: string;
}

export interface FeedResponse {
  res: FeedItem[];
  status: number;
}

export interface FeedQuery {
  url: string;
  force?: boolean;
}