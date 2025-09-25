"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_controller_1 = require("./user.controller");
const user_schema_1 = require("./user.schema");
async function userRoutes(server) {
    // const route = fastify.withTypeProvider<JsonSchemaToTsProvider>();
    server.post("/new", {
        schema: user_schema_1.RegistrationSchema
    }, user_controller_1.registration);
    server.get("/", {
        schema: user_schema_1.LoginSchema
    }, user_controller_1.login);
    server.get("/profile", {
        onRequest: [server.authenticate],
    }, async (request, reply) => {
        return {
            user: request.user,
            timestamp: new Date().toISOString()
        };
    });
}
exports.default = userRoutes;
