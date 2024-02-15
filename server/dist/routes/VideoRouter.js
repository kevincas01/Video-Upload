"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const VideoController_1 = __importDefault(require("../controller/VideoController"));
const authorization_1 = require("../middleware/authorization");
const BaseRouter_1 = __importDefault(require("./BaseRouter"));
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage: storage });
class VideoRoutes extends BaseRouter_1.default {
    routes() {
        this.router.get('/', authorization_1.auth, VideoController_1.default.getComments);
        this.router.get('/:videoId', authorization_1.auth, VideoController_1.default.getComments);
        this.router.post('/comment/:videoId', authorization_1.auth, VideoController_1.default.createComment);
    }
}
exports.default = new VideoRoutes().router;
