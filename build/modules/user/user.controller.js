"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registration = registration;
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
        reply.code(500).send(error);
    }
}
