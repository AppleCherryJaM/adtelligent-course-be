"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserSchema = {
    tags: ['user'],
    summary: "Create User Schema",
    description: 'Create User Schema',
    body: {
        type: 'object',
        properties: {
            email: { type: 'string', minLength: 7 },
            password: { type: 'string', minLength: 5 },
        },
        required: ['email', 'password']
    },
    response: {
        200: {
            type: 'object',
            properties: {
                email: { type: 'string' },
                password: { type: 'string' },
            },
            required: ['email', 'password']
        }
    }
};
exports.default = UserSchema;
