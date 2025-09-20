"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const rss_parser_1 = __importDefault(require("rss-parser"));
const parser = new rss_parser_1.default();
const defaultUrl = process.env.FEED_URL;
async function getFeed(feedUrl, force) {
    let result;
    try {
        const feed = await parser.parseURL("https://feeds.bbci.co.uk/news/rss.xml");
        result = { res: JSON.stringify(feed.items), status: 200 };
    }
    catch (error) {
        console.log(error);
        result = { res: error, status: 500 };
    }
    return result;
}
exports.default = getFeed;
