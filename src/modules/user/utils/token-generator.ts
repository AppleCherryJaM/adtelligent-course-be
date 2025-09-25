import type { FastifyInstance } from "fastify";

// utils/jwt.ts
export function generateToken(fastify: FastifyInstance, user: { id: string; email: string }): string {
  return fastify.jwt.sign({
    id: user.id,
    email: user.email
  });
}