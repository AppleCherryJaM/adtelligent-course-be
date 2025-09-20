"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
exports.schema = {
    tags: ['feed'],
    summary: 'Feed data',
    description: 'Feed data',
    response: {
        200: {
            type: 'object',
            properties: {
                hello: {
                    type: 'string',
                }
            }
        }
    }
};
