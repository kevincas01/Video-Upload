"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const FeedController_1 = __importDefault(require("../controller/FeedController"));
const authorization_1 = require("../middleware/authorization");
const BaseRouter_1 = __importDefault(require("./BaseRouter"));
class FeedRoutes extends BaseRouter_1.default {
    routes() {
        this.router.get('/', authorization_1.auth, FeedController_1.default.getVideos);
        this.router.post('/', authorization_1.auth, FeedController_1.default.postVideo);
        this.router.get('/users', authorization_1.auth, FeedController_1.default.getUsers);
    }
}
exports.default = new FeedRoutes().router;
