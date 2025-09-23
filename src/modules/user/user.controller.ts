import type { FastifyReply, FastifyRequest } from "fastify";

import type { UserInputSchema } from "./user.schema";
import { createUser } from "./user.service";

async function registration(request: FastifyRequest<{
	Body: UserInputSchema
}>, reply: FastifyReply) {
	const {email, password} = request.body;
	const hashPassword = await request.server.bcrypt.hash(password, 10);
	try {
		const user = await createUser({email, password: hashPassword});

		return reply.status(201).send(user);
	} catch (error) {
		console.log(error);
		reply.code(500).send(error);
	}
}

export {registration};