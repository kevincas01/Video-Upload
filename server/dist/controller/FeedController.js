"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Video_1 = __importDefault(require("../utils/Video"));
const db_1 = require("../db");
// import { Video } from "../services/Videos";
class FeedController {
    //   title  String
    //   description String  
    //   link String -HAVE TO CREATE 
    //   datePosted DateTime -HAVE TO CREATE 
    //   tag String[]
    //   user
    postVideo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { title, videoContent, description, tags } = req.body;
                // Have to create the link so we can send it to the AWS cloudfront
                const generatedLink = "www.test.com";
                const currentDatetime = Video_1.default.getCurrentDatetime();
                const userId = req.app.locals.credentials.userId;
                const video = yield db_1.prisma.video.create({
                    data: {
                        title: title,
                        description: description,
                        link: generatedLink,
                        datePosted: currentDatetime,
                        tag: tags,
                        userId: userId
                    },
                });
                return res.status(200).json({
                    status: "Ok!",
                    message: "Successfully posted video!"
                });
            }
            catch (error) {
                return res.status(500).json({
                    status: "Internal server Error!",
                    message: "Internal server Error!",
                });
            }
        });
    }
    getVideos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("getting users");
                console.log(req.app.locals.credentials);
                // CHANGE TO VIDEOS LATER
                const videos = yield db_1.prisma.user.findMany();
                return res.status(200).json({
                    status: "Ok!",
                    message: "Successfully registered!",
                    result: videos
                });
            }
            catch (error) {
                return res.status(500).json({
                    status: "Internal server Error!",
                    message: "Internal server Error!",
                });
            }
        });
    }
    getUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const videos = yield db_1.prisma.user.findMany();
                return res.status(200).json({
                    status: "Ok!",
                    message: "C!"
                });
            }
            catch (error) {
                return res.status(500).json({
                    status: "Internal server Error!",
                    message: "Internal server Error!",
                });
            }
        });
    }
}
exports.default = new FeedController();
