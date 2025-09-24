"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const feedParser_service_1 = __importDefault(require("../services/feedParser.service"));
const getFeedData_schema_1 = require("../schemas/getFeedData.schema");
async function feedDataRoutes(fastify) {
    const server = fastify.withTypeProvider();
    server.get('/', {
        schema: getFeedData_schema_1.FeedResponseSchema
    }, async (request, reply) => {
        const { url: queryUrl, force } = request.query;
        const url = queryUrl || process.env.FEED_URL;
        if (!url) {
            return reply.status(400).send({
                error: 'URL required',
                message: 'Please provide RSS feed URL via ?url= parameter or set FEED_URL environment variable'
            });
        }
        try {
            const result = await (0, feedParser_service_1.default)(url, force);
            if (result === null) {
                return reply.status(500).send({
                    error: 'Parse error',
                    message: 'Failed to parse RSS feed'
                });
            }
            let resData;
            if (typeof result.res === 'string') {
                try {
                    resData = JSON.parse(result.res);
                }
                catch (parseError) {
                    console.error('Error parsing JSON:', parseError);
                    return reply.status(500).send({
                        error: 'Invalid JSON',
                        message: 'Failed to parse feed data'
                    });
                }
            }
            else {
                resData = result.res;
            }
            if (!Array.isArray(resData)) {
                console.error('Expected array but got:', typeof resData, resData);
                return reply.status(500).send({
                    error: 'Invalid data format',
                    message: 'Expected array of feed items'
                });
            }
            return {
                res: resData,
                status: result.status || 200
            };
        }
        catch (error) {
            console.error('Error in feed route:', error);
            return reply.status(500).send({
                error: 'Internal server error',
                message: 'Failed to process RSS feed'
            });
        }
    });
}
exports.default = feedDataRoutes;
