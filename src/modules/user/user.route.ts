import { FastifyInstance } from "fastify";

import { createUser } from "./user.controller";

async function userRoutes(server: FastifyInstance) {
	server.post("/new", createUser);
}

export default userRoutes;