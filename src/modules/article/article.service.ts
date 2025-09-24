// services/contentParser.service.ts
import * as cheerio from 'cheerio';
import type { ArticleContent } from './article.type';

export async function parseArticleContent(articleUrl: string): Promise<ArticleContent | null> {
  try {
    // Добавляем заголовки чтобы избежать блокировки
    const response = await fetch(articleUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const html = await response.text();
    const $ = cheerio.load(html);

    const title = $('h1').first().text().trim() || 
                  $('title').text().trim() ||
                  'No title found';

    let content = '';
    
    const contentSelectors = [
      'article',
      '.story-body',
      '.article-body',
      '.content',
      'main',
      '[role="main"]',
      '.post-content'
    ];

    for (const selector of contentSelectors) {
      const contentElement = $(selector).first();
      if (contentElement.length > 0) {
        content = contentElement.find('p').map((i, el) => $(el).text()).get().join('\n\n').trim();
        if (content) {break};
      }
    }

    if (!content) {
      content = $('p').map((i, el) => $(el).text()).get().join('\n\n').trim();
    }

    const excerpt = content.substring(0, 200) + (content.length > 200 ? '...' : '');

    const image = $('meta[property="og:image"]').attr('content') ||
                  $('meta[name="twitter:image"]').attr('content') ||
                  $('img').first().attr('src') ||
                  undefined;

    const publishedAt = $('meta[property="article:published_time"]').attr('content') ||
                        $('time[datetime]').first().attr('datetime') ||
                        undefined;

    const author = $('meta[name="author"]').attr('content') ||
                   $('.author').first().text().trim() ||
                   $('[rel="author"]').first().text().trim() ||
                   undefined;

    return {
      title: title || 'No title',
      content: content || 'Content not available',
      excerpt: excerpt || 'No excerpt available',
      image,
      publishedAt,
      author
    };

  } catch (error) {
    console.error('Error parsing article content:', error);
    return null;
  }
}