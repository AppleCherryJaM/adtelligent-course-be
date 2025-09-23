"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = createUser;
const prisma_1 = __importDefault(require("../../utils/prisma"));
async function createUser(input) {
    const { email, password } = input;
    const user = await prisma_1.default.user.create({
        data: {
            email, password
        }
    });
    return user;
}
