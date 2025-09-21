"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = exports.feedDataRoutes = void 0;
const feedParser_route_1 = __importDefault(require("../modules/feedParser/routes/feedParser.route"));
exports.feedDataRoutes = feedParser_route_1.default;
const user_route_1 = __importDefault(require("../modules/user/user.route"));
exports.userRoutes = user_route_1.default;
