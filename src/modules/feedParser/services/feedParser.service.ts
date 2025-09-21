import Parser from "rss-parser";

import type { feedParserResult } from "../types/feedParserResult.type";
import prisma from "../../../utils/prisma";

const parser = new Parser();
const defaultUrl = process.env.FEED_URL || "https://feeds.bbci.co.uk/news/rss.xml";

async function getFeed(feedUrl?: string, force?: boolean) {
	const url = feedUrl || defaultUrl;

	let result: feedParserResult;
	try {
		if (!force) {
			const cached = await prisma.feed.findFirst({where: {url}})
    	if (cached) { 
				console.log("Cached: ", cached)
				return cached.data
			}
		}
		const feed = await parser.parseURL(url);
		result = {res: JSON.stringify(feed.items), status: 200};
	} catch (error) {
		console.log(error);
		result = {res: error, status: 500}
	}
	return result
}

export default getFeed;