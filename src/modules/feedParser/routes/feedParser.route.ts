import type {FastifyInstance} from "fastify";
import type {JsonSchemaToTsProvider} from "@fastify/type-provider-json-schema-to-ts";

import {schema} from "../schemas/getFeedData.schema";
import getFeed from "../services/feedParser.service";


async function feedDataRoutes(fastify: FastifyInstance) {
    const route = fastify.withTypeProvider<JsonSchemaToTsProvider>()
    
    fastify.get('/', async (request, reply) => {
      const { url, force } = request.query as {url: string | undefined, force: boolean};
      const result = await getFeed(url, force);
      return result;
    });
}

export default feedDataRoutes;