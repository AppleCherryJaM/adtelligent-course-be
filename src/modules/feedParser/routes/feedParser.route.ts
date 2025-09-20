import {FastifyInstance} from "fastify";
import {schema} from "../schemas/getFeedData.schema";
import {JsonSchemaToTsProvider} from "@fastify/type-provider-json-schema-to-ts";
import getFeed from "../services/feedParser.service";

export async  function getFeedDataRoutes(fastify: FastifyInstance) {
    const route = fastify.withTypeProvider<JsonSchemaToTsProvider>()
    const feed = await getFeed();
    console.log("Feed: ", feed);
    route.get('/feed', {
      schema: schema,
    }, async (request, reply) => {
        reply.send({result: feed.res, status: feed.status})
    })
}