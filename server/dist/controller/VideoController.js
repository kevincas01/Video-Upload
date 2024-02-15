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
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../db");
class VideoController {
    createComment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { videoId } = req.params;
                const { comment } = req.body;
                const user = req.app.locals.credentials;
                const newComment = yield db_1.prisma.comment.create({
                    data: {
                        text: comment,
                        totalLikes: 0, // Assuming totalLikes starts at 0
                        video: { connect: { videoid: Number(videoId) } }, // Connect the comment to the video by its ID
                        user: { connect: { id: user.userId } } // Connect the comment to the user by their ID
                    }
                });
                return res.status(200).json({
                    status: "Ok!",
                    message: "Successfully logged in!",
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
    getComments(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { videoId } = req.params;
                const comments = yield db_1.prisma.comment.findMany({
                    where: {
                        videoId: Number(videoId) // Assuming idVideo is the variable containing the target videoId
                    },
                    include: {
                        user: {
                            select: {
                                name: true,
                            },
                        },
                    }
                });
                return res.status(200).json({
                    status: "Ok!",
                    message: "Successfully logged in!",
                    result: comments
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
exports.default = new VideoController();
