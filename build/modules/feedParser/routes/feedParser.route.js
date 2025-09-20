"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFeedDataRoutes = getFeedDataRoutes;
const getFeedData_schema_1 = require("../schemas/getFeedData.schema");
const feedParser_service_1 = __importDefault(require("../services/feedParser.service"));
async function getFeedDataRoutes(fastify) {
    const route = fastify.withTypeProvider();
    const feed = await (0, feedParser_service_1.default)();
    console.log("Feed: ", feed);
    route.get('/feed', {
        schema: getFeedData_schema_1.schema,
    }, async (request, reply) => {
        reply.send({ result: feed.res, status: feed.status });
    });
}
