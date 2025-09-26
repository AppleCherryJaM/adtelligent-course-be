import Fastify, {type FastifyServerOptions} from "fastify";
import {join} from "node:path";
import AutoLoad from "@fastify/autoload";

import configPlugin from "./config";
import { articleRoutes, feedDataRoutes, userRoutes } from "./routes";
import swaggerPlugin from "./plugins/swagger";
import jwtPlugin from './plugins/jwt';

export type AppOptions = Partial<FastifyServerOptions>

async function buildApp(options: AppOptions = {}){

    const fastify = Fastify({
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
    await fastify.register(configPlugin);
    await fastify.register(jwtPlugin);
    await fastify.register(swaggerPlugin);

    try {
        fastify.decorate("pluginLoaded", (pluginName: string) => {
            fastify.log.info(`✅ Plugin loaded: ${pluginName}`);
        });

        fastify.log.info("Starting to load plugins");
        await fastify.register(AutoLoad, {
            dir: join(__dirname, "plugins"),
            options: options,
            ignorePattern: /^((?!plugin).)*$/,
        });

        fastify.log.info("✅ Plugins loaded successfully");
    } catch (error) {
        fastify.log.error("Error in autoload:", error);
        throw error;
    }

    try {
        fastify.decorate("routeLoaded", (routeName: string) => {
            fastify.log.info(`✅ Plugin loaded: ${routeName}`);
        });

        fastify.log.info("Starting to load routes");
        await fastify.register(AutoLoad, {
            dir: join(__dirname, "routes"),
            options: options,
        });

        fastify.log.info("✅ Routes loaded successfully");
    } catch (error) {
        fastify.log.error("Error in autoload:", error);
        throw error;
    }

    fastify.register(feedDataRoutes, {prefix: "/api/feed"})
    fastify.register(userRoutes, {prefix: '/api/user'});
    fastify.register(articleRoutes, {prefix: '/api/article'});

    fastify.get("/", async (request, reply) => {
        return {hello: "world"}
    })

    fastify.ready((err) => {
    if (err) throw err;
    
    // Выводим Swagger спецификацию в консоль (опционально)
    console.log('Swagger documentation available at http://localhost:3000/docs');
    console.log('Swagger JSON available at http://localhost:3000/docs/json');
  });

    return fastify
}

export default buildApp

// function swaggerPlugin(instance: FastifyInstance<RawServerDefault, IncomingMessage, ServerResponse<IncomingMessage>, FastifyBaseLogger, FastifyTypeProvider>, opts: FastifyPluginOptions, done: (err?: Error | undefined) => void): void {
//     throw new Error("Function not implemented.");
// }
