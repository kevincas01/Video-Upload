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
exports.VideoDbMethods = void 0;
const db_1 = require("../db");
class VideoDbMethods {
    getVideosByTag(page, tag) {
        return __awaiter(this, void 0, void 0, function* () {
            const skip = (page - 1) * 15;
            const videos = yield db_1.prisma.video.findMany({
                skip: skip,
                take: 15,
                where: {
                    tag: {
                        hasEvery: [tag]
                    }
                },
                orderBy: {
                    title: 'desc',
                },
            });
            if (!videos) {
                throw new Error("Failed to get videos with tag");
            }
            return videos;
        });
    }
    getVideosBySearch(page, searchString) {
        return __awaiter(this, void 0, void 0, function* () {
            const skip = (page - 1) * 15;
            const videos = yield db_1.prisma.video.findMany({
                skip: skip,
                take: 15,
                where: {
                    title: {
                        contains: searchString
                    }
                },
                orderBy: {
                    title: 'desc',
                },
            });
            if (!videos) {
                throw new Error("Failed to get videos with search input");
            }
            return videos;
        });
    }
    getVideosByUser(page, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const skip = (page - 1) * 15;
            const videos = yield db_1.prisma.video.findMany({
                skip: skip,
                take: 15,
                where: {
                    userId: userId
                },
                orderBy: {
                    title: 'desc',
                },
            });
            if (!videos) {
                throw new Error("Failed to get videos with search input");
            }
            return videos;
        });
    }
}
exports.VideoDbMethods = VideoDbMethods;
