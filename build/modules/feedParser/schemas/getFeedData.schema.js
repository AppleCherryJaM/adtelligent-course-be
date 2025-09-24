"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedItemSchema = exports.FeedResponseSchema = void 0;
const FeedItemSchema = {
    type: 'object',
    properties: {
        title: { type: 'string' },
        link: { type: 'string' },
        pubDate: { type: 'string' },
        content: { type: 'string' },
        contentSnippet: { type: 'string' },
        guid: { type: 'string' },
        isoDate: { type: 'string', format: 'date-time' }
    },
    required: ['title', 'link', 'pubDate']
};
exports.FeedItemSchema = FeedItemSchema;
const FeedResponseSchema = {
    tags: ['feed'],
    summary: "Get RSS Feed",
    description: 'Fetch and parse RSS feed from provided URL',
    querystring: {
        type: 'object',
        properties: {
            url: {
                type: 'string',
                format: 'uri',
                description: 'RSS feed URL'
            },
            force: {
                type: 'boolean',
                default: false,
                description: 'Force refresh cache'
            }
        },
    },
    response: {
        200: {
            type: 'object',
            properties: {
                res: {
                    type: 'array',
                    items: FeedItemSchema
                },
                status: { type: 'number' }
            },
            required: ['res', 'status']
        },
        400: {
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
exports.FeedResponseSchema = FeedResponseSchema;
