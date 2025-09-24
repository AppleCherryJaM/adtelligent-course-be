"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const article_schema_1 = require("./article.schema");
const acrticle_controller_1 = require("./acrticle.controller");
async function articleRoutes(fastify) {
    const server = fastify.withTypeProvider();
    server.get('/', {
        schema: article_schema_1.ArticleContentSchema
    }, acrticle_controller_1.getArticleContent);
}
exports.default = articleRoutes;
