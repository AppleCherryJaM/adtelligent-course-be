"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getArticleContent = getArticleContent;
const article_service_1 = require("./article.service");
async function getArticleContent(request, reply) {
    const { url } = request.query;
    try {
        const articleContent = await (0, article_service_1.parseArticleContent)(url);
        if (!articleContent) {
            return reply.status(404).send({
                error: 'Article not found',
                message: 'Could not fetch or parse the article content'
            });
        }
        return reply.status(200).send(articleContent);
    }
    catch (error) {
        console.error('Error in article content route:', error);
        return reply.status(500).send({
            error: 'Internal server error',
            message: 'Failed to fetch article content'
        });
    }
}
