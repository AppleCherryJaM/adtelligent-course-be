"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// plugins/swagger.ts
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
const swagger_1 = __importDefault(require("@fastify/swagger"));
const swagger_ui_1 = __importDefault(require("@fastify/swagger-ui"));
exports.default = (0, fastify_plugin_1.default)(async (fastify) => {
    // Регистрируем Swagger генератор
    await fastify.register(swagger_1.default, {
        swagger: {
            info: {
                title: 'Adtelligent Course API',
                description: 'API documentation for Adtelligent Course project',
                version: '1.0.0'
            },
            externalDocs: {
                url: 'https://swagger.io',
                description: 'Find more info here'
            },
            host: 'localhost:3000', // Измени на свой хост
            schemes: ['http'],
            consumes: ['application/json'],
            produces: ['application/json'],
            tags: [
                { name: 'user', description: 'User related end-points' },
                { name: 'feed', description: 'RSS feed related end-points' },
                { name: 'articles', description: 'Article content related end-points' }
            ],
            securityDefinitions: {
                bearerAuth: {
                    type: 'apiKey',
                    name: 'Authorization',
                    in: 'header',
                    description: 'Bearer token authorization'
                }
            }
        }
    });
    // Регистрируем Swagger UI
    await fastify.register(swagger_ui_1.default, {
        routePrefix: '/docs',
        uiConfig: {
            docExpansion: 'full',
            deepLinking: false
        },
        uiHooks: {
            onRequest: (request, reply, next) => { next(); },
            preHandler: (request, reply, next) => { next(); }
        },
        staticCSP: true,
        transformStaticCSP: (header) => header,
        transformSpecification: (swaggerObject, request, reply) => { return swaggerObject; },
        transformSpecificationClone: true
    });
});
