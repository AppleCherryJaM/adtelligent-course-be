import type {FastifyInstance} from "fastify";
import type {JsonSchemaToTsProvider} from "@fastify/type-provider-json-schema-to-ts";

import {schema} from "../schemas/getFeedData.schema";
import getFeed from "../services/feedParser.service";


async function feedDataRoutes(fastify: FastifyInstance) {
    const route = fastify.withTypeProvider<JsonSchemaToTsProvider>()
    console.log("fastify: ", fastify);
    const feed = await getFeed();
    console.log("Feed: ", feed);
    route.get('/feed', {
      schema: schema,
    }, async (request, reply) => {
        reply.send({result: feed})
    })
}

export default feedDataRoutes;