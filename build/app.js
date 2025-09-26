"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const node_path_1 = require("node:path");
const autoload_1 = __importDefault(require("@fastify/autoload"));
const config_1 = __importDefault(require("./config"));
const routes_1 = require("./routes");
const swagger_1 = __importDefault(require("./plugins/swagger"));
const jwt_1 = __importDefault(require("./plugins/jwt"));
async function buildApp(options = {}) {
    const fastify = (0, fastify_1.default)({
        logger: true,
        ajv: {
            customOptions: {
                removeAdditional: false, // Важно для Swagger
                useDefaults: true,
                coerceTypes: true,
                allErrors: true
            }
        }
    });
    await fastify.register(config_1.default);
    await fastify.register(jwt_1.default);
    await fastify.register(swagger_1.default);
    try {
        fastify.decorate("pluginLoaded", (pluginName) => {
            fastify.log.info(`✅ Plugin loaded: ${pluginName}`);
        });
        fastify.log.info("Starting to load plugins");
        await fastify.register(autoload_1.default, {
            dir: (0, node_path_1.join)(__dirname, "plugins"),
            options: options,
            ignorePattern: /^((?!plugin).)*$/,
        });
        fastify.log.info("✅ Plugins loaded successfully");
    }
    catch (error) {
        fastify.log.error("Error in autoload:", error);
        throw error;
    }
    try {
        fastify.decorate("routeLoaded", (routeName) => {
            fastify.log.info(`✅ Plugin loaded: ${routeName}`);
        });
        fastify.log.info("Starting to load routes");
        await fastify.register(autoload_1.default, {
            dir: (0, node_path_1.join)(__dirname, "routes"),
            options: options,
        });
        fastify.log.info("✅ Routes loaded successfully");
    }
    catch (error) {
        fastify.log.error("Error in autoload:", error);
        throw error;
    }
    fastify.register(routes_1.feedDataRoutes, { prefix: "/api/feed" });
    fastify.register(routes_1.userRoutes, { prefix: '/api/user' });
    fastify.register(routes_1.articleRoutes, { prefix: '/api/article' });
    fastify.get("/", async (request, reply) => {
        return { hello: "world" };
    });
    fastify.ready((err) => {
        if (err)
            throw err;
        // Выводим Swagger спецификацию в консоль (опционально)
        console.log('Swagger documentation available at http://localhost:3000/docs');
        console.log('Swagger JSON available at http://localhost:3000/docs/json');
    });
    return fastify;
}
exports.default = buildApp;
// function swaggerPlugin(instance: FastifyInstance<RawServerDefault, IncomingMessage, ServerResponse<IncomingMessage>, FastifyBaseLogger, FastifyTypeProvider>, opts: FastifyPluginOptions, done: (err?: Error | undefined) => void): void {
//     throw new Error("Function not implemented.");
// }
