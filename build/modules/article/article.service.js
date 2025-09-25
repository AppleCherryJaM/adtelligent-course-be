"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseArticleContent = parseArticleContent;
// services/contentParser.service.ts
const cheerio = __importStar(require("cheerio"));
async function parseArticleContent(articleUrl) {
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
                if (content) {
                    break;
                }
                ;
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
    }
    catch (error) {
        console.error('Error parsing article content:', error);
        return null;
    }
}
