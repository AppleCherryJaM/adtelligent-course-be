"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_controller_1 = require("./user.controller");
const user_schema_1 = __importDefault(require("./user.schema"));
async function userRoutes(server) {
    // const route = fastify.withTypeProvider<JsonSchemaToTsProvider>();
    server.post("/new", {
        schema: user_schema_1.default
    }, user_controller_1.registration);
}
exports.default = userRoutes;
