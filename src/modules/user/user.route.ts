import { fastify, type FastifyInstance } from "fastify";

import { registration } from "./user.controller";
import UserSchema from "./user.schema";
import type { JsonSchemaToTsProvider } from "@fastify/type-provider-json-schema-to-ts";

async function userRoutes(server: FastifyInstance) {

	// const route = fastify.withTypeProvider<JsonSchemaToTsProvider>();

	server.post(
  "/new",
  {
    schema: UserSchema
  },
  registration
);

}

export default userRoutes;