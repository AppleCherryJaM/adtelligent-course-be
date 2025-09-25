"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// plugins/jwt.ts
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
const jwt_1 = __importDefault(require("@fastify/jwt"));
exports.default = (0, fastify_plugin_1.default)(async (fastify) => {
    // Регистрируем JWT плагин
    await fastify.register(jwt_1.default, {
        secret: process.env.JWT_SECRET || 'your-super-secret-key-change-in-production'
    });
    // Декорируем fastify authenticate методом
    fastify.decorate('authenticate', async (request, reply) => {
        try {
            await request.jwtVerify();
        }
        catch (err) {
            reply.send(err);
        }
    });
});
