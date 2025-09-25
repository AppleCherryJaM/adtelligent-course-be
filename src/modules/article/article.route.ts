// routes/article.route.ts
import type { FastifyInstance } from "fastify";
import type { JsonSchemaToTsProvider } from "@fastify/type-provider-json-schema-to-ts";

import { ArticleContentSchema } from "./article.schema";
import { getArticleContent } from "./acrticle.controller";


async function articleRoutes(fastify: FastifyInstance) {
  const server = fastify.withTypeProvider<JsonSchemaToTsProvider>();
  
  server.get('/', {
    schema: ArticleContentSchema
  }, getArticleContent);
}

export default articleRoutes;