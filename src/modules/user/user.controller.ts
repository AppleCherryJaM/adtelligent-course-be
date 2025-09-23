import type { FastifyReply, FastifyRequest } from "fastify";
import type { UserInputSchema } from "./user.type";
import { createUser, getUser } from "./user.service";

async function registration(request: FastifyRequest<{
  Body: UserInputSchema
}>, reply: FastifyReply) {
  const { email, password } = request.body;
  const hashPassword = await request.server.bcrypt.hash(password, 10);
  
  try {
    const user = await createUser({ email, password: hashPassword });
    return reply.status(201).send(user);
  } catch (error) {
    console.log(error);
    return reply.code(500).send(error);
  }
}

async function login(request: FastifyRequest<{
  Querystring: UserInputSchema
}>, reply: FastifyReply) {
  const { email, password } = request.query;

  try {
    const user = await getUser({ email, password });
    
    if (!user) {
      return reply.status(404).send({
        error: 'User not found',
        message: 'Cannot find user with current email'
      });
    }

    const isPasswordValid = await request.server.bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      return reply.status(401).send({
        error: 'Invalid password',
        message: 'Invalid password'
      });
    }

    return reply.status(200).send({
      id: user.id,
      email: user.email,
      message: 'Success'
    });

  } catch (error) {
    console.log(error);
    return reply.code(500).send({
      error: 'Internal server error',
      message: 'Server error'
    });
  }
}

export { registration, login };