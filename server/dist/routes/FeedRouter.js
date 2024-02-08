"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const FeedController_1 = __importDefault(require("../controller/FeedController"));
const authorization_1 = require("../middleware/authorization");
const BaseRouter_1 = __importDefault(require("./BaseRouter"));
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage: storage });
class FeedRoutes extends BaseRouter_1.default {
    routes() {
        this.router.get('/', authorization_1.auth, FeedController_1.default.getVideoPreviews);
        this.router.get('/:videoId', authorization_1.auth, FeedController_1.default.getVideoInformation);
        this.router.get('/users', authorization_1.auth, FeedController_1.default.getUsers);
        this.router.post('/post', authorization_1.auth, upload.fields([{ name: 'video', maxCount: 1 }, { name: 'thumbnail', maxCount: 1 }]), FeedController_1.default.postVideo);
    }
}
exports.default = new FeedRoutes().router;
