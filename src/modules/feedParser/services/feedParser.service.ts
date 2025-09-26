import Parser from 'rss-parser';
import type { FeedItem, FeedResponse} from '../types/feedParser.type';
import prisma from '../../../utils/prisma';

const parser = new Parser();

async function getFeed(url: string, force = false): Promise<FeedResponse | null> {
	try {
		if (!force) {
			const cached = await prisma.feed.findFirst({where: {url}})
    	if (cached) { 
				const parsedData: FeedItem[] = JSON.parse(cached.data);
          return {
            res: parsedData,
            status: 200
          };
			}
		}
	} catch (error) {
		console.error(error);
	}

	try {
    const feed = await parser.parseURL(url);
    console.log(`Feed ${feed}`);

    const items: FeedItem[] = feed.items.map(item => ({
      title: item.title || '',
      link: item.link || '',
      pubDate: item.pubDate || '',
      content: item.content || '',
      contentSnippet: item.contentSnippet || '',
      guid: item.guid || '',
      isoDate: item.isoDate || ''
    }));

    return {
      res: items,
      status: 200
    };
    
  } catch (error) {
    console.error('Error parsing RSS feed:', error);
    return null;
  }
}

export default getFeed;