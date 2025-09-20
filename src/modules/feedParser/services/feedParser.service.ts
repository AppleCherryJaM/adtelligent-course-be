import Parser from "rss-parser";
import { feedParserResult } from "../types/feedParserResult.type";
const parser = new Parser();

const defaultUrl = process.env.FEED_URL;

async function getFeed(feedUrl?: string, force?: boolean) {
	let result: feedParserResult;
	try {
		const feed = await parser.parseURL("https://feeds.bbci.co.uk/news/rss.xml");
		result = {res: JSON.stringify(feed.items), status: 200};
	} catch (error) {
		console.log(error);
		result = {res: error, status: 500}
	}
	return result
}

export default getFeed;