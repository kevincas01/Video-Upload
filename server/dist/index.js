"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const AuthenticateRouter_1 = __importDefault(require("./routes/AuthenticateRouter"));
const FeedRouter_1 = __importDefault(require("./routes/FeedRouter"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.listen(3005);
app.use(express_1.default.json());
app.use('/authenticate', AuthenticateRouter_1.default);
//Users Route
app.use('/feed', FeedRouter_1.default);
//Feed Route
