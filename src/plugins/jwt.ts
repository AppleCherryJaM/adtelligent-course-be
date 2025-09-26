// plugins/jwt.ts
import fp from 'fastify-plugin';
import fjwt, { FastifyJWT } from '@fastify/jwt';
import type { FastifyRequest, FastifyReply } from 'fastify';

export default fp(async (fastify) => {
  // Регистрируем JWT плагин
  await fastify.register(fjwt, {
    secret: process.env.JWT_SECRET || 'your-super-secret-key-change-in-production'
  });

  // Декорируем fastify authenticate методом
  fastify.decorate('authenticate', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.send(err);
    }
  });
});

declare module 'fastify' {
  interface FastifyInstance {
    authenticate: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
  }
}

declare module '@fastify/jwt' {
  interface FastifyJWT {
    user: {
      id: string;
      email: string;
    };
  }
}