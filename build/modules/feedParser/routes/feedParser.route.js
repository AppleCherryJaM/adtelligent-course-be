"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const feedParser_service_1 = __importDefault(require("../services/feedParser.service"));
async function feedDataRoutes(fastify) {
    const route = fastify.withTypeProvider();
    fastify.get('/', async (request, reply) => {
        const { url, force } = request.query;
        const result = await (0, feedParser_service_1.default)(url, force);
        return result;
    });
}
exports.default = feedDataRoutes;
