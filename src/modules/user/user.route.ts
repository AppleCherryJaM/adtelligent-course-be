import { fastify, type FastifyInstance } from "fastify";

import { login, registration } from "./user.controller";
import {LoginSchema, RegistrationSchema} from "./user.schema";
import type { JsonSchemaToTsProvider } from "@fastify/type-provider-json-schema-to-ts";

async function userRoutes(server: FastifyInstance) {
	// const route = fastify.withTypeProvider<JsonSchemaToTsProvider>();
	server.post(
  "/new",
  {
    schema: RegistrationSchema
  },
  registration
);

	server.get(
    "/",
    {
      schema: LoginSchema
    },
    login
  );

  server.get("/profile", {
    onRequest: [server.authenticate],
  }, async (request, reply) => {
    return { 
      user: request.user,
      timestamp: new Date().toISOString()
    };
  });
}

export default userRoutes;