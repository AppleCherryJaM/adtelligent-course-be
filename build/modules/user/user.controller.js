"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registration = registration;
exports.login = login;
const user_service_1 = require("./user.service");
async function registration(request, reply) {
    const { email, password } = request.body;
    const hashPassword = await request.server.bcrypt.hash(password, 10);
    try {
        const user = await (0, user_service_1.createUser)({ email, password: hashPassword });
        return reply.status(201).send(user);
    }
    catch (error) {
        console.log(error);
        return reply.code(500).send(error);
    }
}
async function login(request, reply) {
    const { email, password } = request.query;
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
        return reply.status(200).send({
            id: user.id,
            email: user.email,
            message: 'Success'
        });
    }
    catch (error) {
        console.log(error);
        return reply.code(500).send({
            error: 'Internal server error',
            message: 'Server error'
        });
    }
}
