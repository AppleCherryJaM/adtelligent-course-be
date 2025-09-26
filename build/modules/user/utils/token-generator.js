"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = generateToken;
// utils/jwt.ts
function generateToken(fastify, user) {
    return fastify.jwt.sign({
        id: user.id,
        email: user.email
    });
}
