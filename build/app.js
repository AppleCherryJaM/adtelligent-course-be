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
const user_route_1 = __importDefault(require("./modules/user/user.route"));
async function buildApp(options = {}) {
    const fastify = (0, fastify_1.default)({ logger: true });
    await fastify.register(config_1.default);
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
    fastify.get("/", async (request, reply) => {
        return { hello: "world" };
    });
    fastify.register(routes_1.feedDataRoutes, { prefix: "/api/feed" });
    fastify.register(user_route_1.default, { prefix: 'api/users' });
    return fastify;
}
exports.default = buildApp;
