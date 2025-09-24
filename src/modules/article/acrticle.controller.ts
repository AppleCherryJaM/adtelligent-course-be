// controllers/article.controller.ts
import type { FastifyReply, FastifyRequest } from "fastify";
import { parseArticleContent } from "./article.service";


async function getArticleContent(
  request: FastifyRequest<{
    Querystring: { url: string }
  }>, 
  reply: FastifyReply
) {
  const { url } = request.query;

  try {
    const articleContent = await parseArticleContent(url);

    if (!articleContent) {
      return reply.status(404).send({
        error: 'Article not found',
        message: 'Could not fetch or parse the article content'
      });
    }

    return reply.status(200).send(articleContent);

  } catch (error) {
    console.error('Error in article content route:', error);
    return reply.status(500).send({
      error: 'Internal server error',
      message: 'Failed to fetch article content'
    });
  }
}

export { getArticleContent };