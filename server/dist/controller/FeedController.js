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
const db_1 = require("../db");
const dotenv_1 = __importDefault(require("dotenv"));
const crypto_1 = __importDefault(require("crypto"));
const client_s3_1 = require("@aws-sdk/client-s3");
dotenv_1.default.config();
const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const awsAccessKey = process.env.AWS_ACCESS_KEY;
const awsSecretKey = process.env.AWS_SECRET_KEY;
// Create an S3ClientConfig object with your AWS credentials and region
const s3ClientConfig = {
    credentials: {
        accessKeyId: awsAccessKey,
        secretAccessKey: awsSecretKey
    },
    region: bucketRegion
};
// Pass the s3ClientConfig object to the S3Client constructor
const s3 = new client_s3_1.S3Client(s3ClientConfig);
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
                console.log(req.app.locals.credentials);
                console.log(bucketName, bucketRegion, awsAccessKey, awsSecretKey);
                console.log("checking request text-", req.body);
                const { title, description, tags } = req.body;
                const tagsArray = tags.split(',');
                let generatedVideoLink = null;
                let generatedThumbnailLink = null;
                if (typeof req.files === 'object' && req.files !== null) {
                    if ("video" in req.files) {
                        const videoFile = req.files['video'][0];
                        generatedVideoLink = crypto_1.default.randomBytes(16).toString('hex') + videoFile.originalname;
                        const params = {
                            Bucket: bucketName,
                            Key: generatedVideoLink,
                            Body: videoFile.buffer,
                            ContentType: videoFile.mimetype
                        };
                        const command = new client_s3_1.PutObjectCommand(params);
                        yield s3.send(command);
                        console.log(videoFile);
                    }
                    if ("thumbnail" in req.files) {
                        const thumbnailFile = req.files['thumbnail'][0];
                        generatedThumbnailLink = crypto_1.default.randomBytes(16).toString('hex') + thumbnailFile.originalname;
                        const params = {
                            Bucket: bucketName,
                            Key: generatedThumbnailLink,
                            Body: thumbnailFile.buffer,
                            ContentType: thumbnailFile.mimetype
                        };
                        const command = new client_s3_1.PutObjectCommand(params);
                        yield s3.send(command);
                    }
                }
                console.log(generatedThumbnailLink);
                if (title && description && generatedVideoLink !== null && generatedThumbnailLink !== null) {
                    const userId = req.app.locals.credentials.userId;
                    const currentDate = new Date();
                    console.log(title);
                    console.log(0);
                    console.log(description);
                    console.log(generatedVideoLink);
                    console.log(generatedThumbnailLink);
                    console.log(currentDate);
                    console.log(tagsArray);
                    console.log(userId);
                    const video = yield db_1.prisma.video.create({
                        data: {
                            title: title,
                            totalLikes: 0,
                            description: description,
                            videoLink: generatedVideoLink,
                            thumbnailLink: generatedThumbnailLink,
                            datePosted: currentDate,
                            tag: tagsArray,
                            userId: userId
                        },
                    });
                }
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
                const videos = yield db_1.prisma.video.findMany();
                return res.status(200).json({
                    status: "Ok!",
                    message: "Videos retrieved successfully!",
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
    getVideosByTag(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { tag } = req.body;
            try {
                const videos = yield db_1.prisma.video.findMany({
                    where: {
                        tag: {
                            has: tag // Check if the 'tag' array contains the specified tag
                        }
                    },
                    select: {
                        videoid: true,
                        title: true,
                        totalLikes: true,
                        thumbnailLink: true,
                        datePosted: true,
                        tag: true,
                        user: {
                            select: {
                                name: true,
                            },
                        },
                    },
                });
                console.log(videos);
                return res.status(200).json({
                    status: "Ok!",
                    message: "Videos retrieved successfully!",
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
    getVideoPreviews(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("206");
                console.log(req.app.locals.credentials);
                // CHANGE TO VIDEOS LATER
                const videos = yield db_1.prisma.video.findMany({
                    select: {
                        videoid: true,
                        title: true,
                        totalLikes: true,
                        thumbnailLink: true,
                        datePosted: true,
                        tag: true,
                        user: {
                            select: {
                                name: true,
                            },
                        },
                    },
                });
                console.log(videos);
                return res.status(200).json({
                    status: "Ok!",
                    message: "Videos retrieved successfully!",
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
    getVideosSortedByMRDate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const videos = yield db_1.prisma.video.findMany({
                    select: {
                        videoid: true,
                        title: true,
                        totalLikes: true,
                        thumbnailLink: true,
                        datePosted: true,
                        tag: true,
                        user: {
                            select: {
                                name: true,
                            },
                        },
                    },
                    orderBy: {
                        datePosted: 'desc',
                    },
                });
                return res.status(200).json({
                    status: "Ok!",
                    message: "Videos retrieved successfully!",
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
    getVideosSortedByLRDate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const videos = yield db_1.prisma.video.findMany({
                    select: {
                        videoid: true,
                        title: true,
                        totalLikes: true,
                        thumbnailLink: true,
                        datePosted: true,
                        tag: true,
                        user: {
                            select: {
                                name: true,
                            },
                        },
                    },
                    orderBy: {
                        datePosted: 'asc',
                    },
                });
                return res.status(200).json({
                    status: "Ok!",
                    message: "Videos retrieved successfully!",
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
    getVideosSortedByPopular(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const videos = yield db_1.prisma.video.findMany({
                    select: {
                        videoid: true,
                        title: true,
                        totalLikes: true,
                        thumbnailLink: true,
                        datePosted: true,
                        tag: true,
                        user: {
                            select: {
                                name: true,
                            },
                        },
                    },
                    orderBy: {
                        totalLikes: 'desc',
                    },
                });
                return res.status(200).json({
                    status: "Ok!",
                    message: "Videos retrieved successfully!",
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
    getVideoInformation(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const videoId = req.params.videoId;
            try {
                console.log("searching videos", videoId);
                const video = yield db_1.prisma.video.findUnique({
                    where: {
                        videoid: parseInt(videoId), // Assuming videoid is an integer
                    },
                });
                // to do: handle where the videoId does not exist
                return res.status(200).json({
                    status: "Ok!",
                    message: "Video retrieved successfully!",
                    result: video
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
