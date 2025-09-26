"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const bcryptPlugin = (0, fastify_plugin_1.default)(async (fastify) => {
    const bcryptHelpers = {
        hash: (data, saltRounds = 10) => bcrypt_1.default.hash(data, saltRounds),
        compare: (data, encrypted) => bcrypt_1.default.compare(data, encrypted),
        genSalt: (saltRounds = 10) => bcrypt_1.default.genSalt(saltRounds)
    };
    fastify.decorate('bcrypt', bcryptHelpers);
}, {
    name: 'bcrypt'
});
exports.default = bcryptPlugin;
