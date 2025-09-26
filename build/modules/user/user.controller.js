"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registration = registration;
exports.login = login;
const user_service_1 = require("./user.service");
const token_generator_1 = require("./utils/token-generator");
async function registration(request, reply) {
    const { email, password } = request.body;
    try {
        const hashPassword = await request.server.bcrypt.hash(password, 10);
        const user = await (0, user_service_1.createUser)({ email, password: hashPassword });
        const token = (0, token_generator_1.generateToken)(request.server, user);
        return reply.status(201).send({
            user: {
                id: user.id,
                email: user.email
            },
            token: token
        });
    }
    catch (error) {
        console.log(error);
        if (error instanceof Error && error.message.includes('unique')) {
            return reply.status(400).send({
                error: "Registration failed",
                message: `User with current email already exists: ${email}`
            });
        }
        return reply.code(500).send({
            error: 'Registration Failed',
            message: error instanceof Error ? error.message : 'Internal server error'
        });
    }
}
async function login(request, reply) {
    const { email, password } = request.body;
    try {
        const user = await (0, user_service_1.getUser)({ email, password });
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
        const token = (0, token_generator_1.generateToken)(request.server, user);
        return reply.status(200).send({
            user: {
                id: user.id,
                email: user.email
            },
            toke: token,
            message: "Login successful"
        });
    }
    catch (error) {
        console.log("Login error", error);
        return reply.code(500).send({
            error: 'Login failed',
            message: error instanceof Error ? error.message : 'Internal server error'
        });
    }
}
