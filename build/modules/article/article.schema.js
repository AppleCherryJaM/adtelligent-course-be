"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleContentSchema = void 0;
// schemas/article.schema.ts
const ArticleContentSchema = {
    tags: ['articles'],
    summary: "Get full article content",
    description: 'Fetch and parse full article content from URL',
    querystring: {
        type: 'object',
        properties: {
            url: {
                type: 'string',
                format: 'uri',
                description: 'Article URL'
            }
        },
        required: ['url']
    },
    response: {
        200: {
            type: 'object',
            properties: {
                title: { type: 'string' },
                content: { type: 'string' },
                excerpt: { type: 'string' },
                image: { type: 'string' },
                publishedAt: { type: 'string' },
                author: { type: 'string' }
            },
            required: ['title', 'content', 'excerpt']
        },
        400: {
            type: 'object',
            properties: {
                error: { type: 'string' },
                message: { type: 'string' }
            }
        },
        404: {
            type: 'object',
            properties: {
                error: { type: 'string' },
                message: { type: 'string' }
            }
        },
        500: {
            type: 'object',
            properties: {
                error: { type: 'string' },
                message: { type: 'string' }
            }
        }
    }
};
exports.ArticleContentSchema = ArticleContentSchema;
