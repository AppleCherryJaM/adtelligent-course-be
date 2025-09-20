"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_controller_1 = require("./user.controller");
async function userRoutes(server) {
    server.post("/new", user_controller_1.createUser);
}
exports.default = userRoutes;
