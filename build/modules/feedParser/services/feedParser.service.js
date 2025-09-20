"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const rss_parser_1 = __importDefault(require("rss-parser"));
const prisma_1 = __importDefault(require("../plugins/prisma"));
const parser = new rss_parser_1.default();
const defaultUrl = process.env.FEED_URL || "https://feeds.bbci.co.uk/news/rss.xml";
async function getFeed(feedUrl, force) {
    const url = feedUrl || defaultUrl;
    let result;
    try {
        if (!force) {
            const cached = await prisma_1.default.feed.findFirst({ where: { url: feedUrl } });
            if (cached) {
                return cached.data;
            }
        }
        const feed = await parser.parseURL(url);
        result = { res: JSON.stringify(feed.items), status: 200 };
    }
    catch (error) {
        console.log(error);
        result = { res: error, status: 500 };
    }
    return result;
}
exports.default = getFeed;
