import type { FastifyInstance } from "fastify";
import type { JsonSchemaToTsProvider } from "@fastify/type-provider-json-schema-to-ts";
import getFeed from "../services/feedParser.service";
import { FeedResponseSchema } from "../schemas/getFeedData.schema";

async function feedDataRoutes(fastify: FastifyInstance) {
  const server = fastify.withTypeProvider<JsonSchemaToTsProvider>();
  
  server.get('/', {
    schema: FeedResponseSchema
  }, async (request, reply) => {
    const { url: queryUrl, force } = request.query;
    
    const url = queryUrl || process.env.FEED_URL;
    
    if (!url) {
      return reply.status(400).send({
        error: 'URL required',
        message: 'Please provide RSS feed URL via ?url= parameter or set FEED_URL environment variable'
      });
    }
    
    try {
      const result = await getFeed(url, force);
      
      if (result === null) {
        return reply.status(500).send({
          error: 'Parse error',
          message: 'Failed to parse RSS feed'
        });
      }
      
      let resData;
      if (typeof result.res === 'string') {
        try {
          resData = JSON.parse(result.res);
        } catch (parseError) {
          console.error('Error parsing JSON:', parseError);
          return reply.status(500).send({
            error: 'Invalid JSON',
            message: 'Failed to parse feed data'
          });
        }
      } else {
        resData = result.res;
      }
      
      if (!Array.isArray(resData)) {
        console.error('Expected array but got:', typeof resData, resData);
        return reply.status(500).send({
          error: 'Invalid data format',
          message: 'Expected array of feed items'
        });
      }
      
      return {
        res: resData,
        status: result.status || 200
      };
      
    } catch (error) {
      console.error('Error in feed route:', error);
      return reply.status(500).send({
        error: 'Internal server error',
        message: 'Failed to process RSS feed'
      });
    }
  });
}

export default feedDataRoutes;