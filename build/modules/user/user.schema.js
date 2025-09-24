"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginSchema = exports.RegistrationSchema = void 0;
const RegistrationSchema = {
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
exports.RegistrationSchema = RegistrationSchema;
const LoginSchema = {
    tags: ['user'],
    summary: "Login User Schema",
    description: 'Authenticate user with email and password',
    querystring: {
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
                id: { type: 'string' },
                email: { type: 'string' },
                message: { type: 'string' }
            },
            required: ['id', 'email', 'message']
        },
        401: {
            type: 'object',
            properties: {
                error: { type: 'string' },
                message: { type: 'string' }
            }
        },
        404: {
            type: 'object',
            properties: {
                error: { type: 'string' },
                message: { type: 'string' }
            }
        }
    }
};
exports.LoginSchema = LoginSchema;
