"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const rss_parser_1 = __importDefault(require("rss-parser"));
const prisma_1 = __importDefault(require("../../../utils/prisma"));
const parser = new rss_parser_1.default();
async function getFeed(url, force = false) {
    try {
        if (!force) {
            const cached = await prisma_1.default.feed.findFirst({ where: { url } });
            if (cached) {
                const parsedData = JSON.parse(cached.data);
                return {
                    res: parsedData,
                    status: 200
                };
            }
        }
    }
    catch (error) {
        console.error(error);
    }
    try {
        const feed = await parser.parseURL(url);
        console.log(`Feed ${feed}`);
        const items = feed.items.map(item => ({
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
    }
    catch (error) {
        console.error('Error parsing RSS feed:', error);
        return null;
    }
}
exports.default = getFeed;
