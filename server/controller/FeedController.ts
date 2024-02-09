import { Request, Response } from "express";
import Video from "../utils/Video";
import { prisma } from "../db";
import Authentication from "../utils/Authentication";
// import { Video } from "../services/Videos";

import multer, { Multer } from 'multer';


import dotenv from 'dotenv'
import crypto from 'crypto'

import {S3Client,PutObjectCommand} from "@aws-sdk/client-s3"

dotenv.config()


const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const awsAccessKey = process.env.AWS_ACCESS_KEY;
const awsSecretKey = process.env.AWS_SECRET_KEY;

// Create an S3ClientConfig object with your AWS credentials and region
const s3ClientConfig = {
    credentials: {
        accessKeyId: awsAccessKey as string,
        secretAccessKey: awsSecretKey as string
    },
    region: bucketRegion as string
};

// Pass the s3ClientConfig object to the S3Client constructor
const s3 = new S3Client(s3ClientConfig);
class FeedController{
    //   title  String
    //   description String  
    //   link String -HAVE TO CREATE 
    //   datePosted DateTime -HAVE TO CREATE 
    //   tag String[]
    //   user

    
    async postVideo(req:Request,res:Response){

        try {


            console.log(req.app.locals.credentials)


            console.log(bucketName,bucketRegion,awsAccessKey,awsSecretKey)
            console.log("checking request text-", req.body)

            const {title,description,tags}=req.body
            const tagsArray=tags.split(',')

            let generatedVideoLink: string | null = null;
            let generatedThumbnailLink: string | null = null;
            
            if (typeof req.files === 'object' && req.files !== null) {

                if ("video" in req.files){

                    const videoFile = req.files['video'][0];
                    
                    generatedVideoLink=crypto.randomBytes(16).toString('hex')+videoFile.originalname;
                    
                        const params={
                        Bucket:bucketName,
                        Key: generatedVideoLink,
                        Body:videoFile.buffer,
                        ContentType:videoFile.mimetype

                    }
                    const command=new PutObjectCommand(params)

                    await s3.send(command)
                    console.log(videoFile)
                }
                if ("thumbnail" in req.files){

                    const thumbnailFile = req.files['thumbnail'][0];
                    generatedThumbnailLink=crypto.randomBytes(16).toString('hex')+thumbnailFile.originalname;
                    
                        const params={
                        Bucket:bucketName,
                        Key: generatedThumbnailLink,
                        Body:thumbnailFile.buffer,
                        ContentType:thumbnailFile.mimetype

                    }
                    const command=new PutObjectCommand(params)

                    await s3.send(command)
                }

            }
            console.log(generatedThumbnailLink)
            
            if (title && description && generatedVideoLink!==null && generatedThumbnailLink!==null) {
                const userId=req.app.locals.credentials.userId 
                const currentDate = new Date();

                console.log(title)
                console.log(0)
                console.log(description)
                console.log(generatedVideoLink)
                console.log(generatedThumbnailLink)
                console.log(currentDate)
                console.log(tagsArray)
                console.log(userId)


                     const video=await prisma.video.create({
                        data: {
                                
                             title:title,
                             totalLikes:0,
                             description  :description,
                             videoLink: generatedVideoLink,
                             thumbnailLink: generatedThumbnailLink,
                             datePosted:  currentDate,
                             tag: tagsArray,
                             userId:  userId
                        },
                    })

            }
            
            return res.status(200).json({
                status: "Ok!",
                message: "Successfully posted video!"
            });

        } catch (error) {
            return res.status(500).json({
                status: "Internal server Error!",
                message: "Internal server Error!",
                
            });
        }

    }
    async getVideos(req:Request,res:Response){

        try {
            const videos=await prisma.video.findMany();
            
            return res.status(200).json({
                status: "Ok!",
                message: "Videos retrieved successfully!",
                result:videos
            });
        } catch (error) {
            return res.status(500).json({
                status: "Internal server Error!",
                message: "Internal server Error!",
            });
        }
    }

    async getVideosByTag(req:Request,res:Response){

        const { tag } = req.body;
                
        try {
            const videos = await prisma.video.findMany({
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
            
            console.log(videos)
            
            
            return res.status(200).json({
                status: "Ok!",
                message: "Videos retrieved successfully!",
                result:videos
            });
        } catch (error) {
            return res.status(500).json({
                status: "Internal server Error!",
                message: "Internal server Error!",
            });
        }
    }

    async getVideoPreviews(req:Request,res:Response){
        try {
            console.log("206")

            console.log(req.app.locals.credentials)
            // CHANGE TO VIDEOS LATER
            const videos = await prisma.video.findMany({
                select: {
                    videoid:true,
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


            for (let video of videos){

                video.thumbnailLink="https://d3f4vrh8x97mrt.cloudfront.net/"+video.thumbnailLink
            }
            
              console.log(videos)
            
            
            return res.status(200).json({
                status: "Ok!",
                message: "Videos retrieved successfully!",
                result:videos
            });
        } catch (error) {
            return res.status(500).json({
                status: "Internal server Error!",
                message: "Internal server Error!",
            });
        }
    }

    async getVideosSortedByMRDate(req:Request,res:Response){

        try {

            const videos = await prisma.video.findMany({
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
                result:videos
            });
            
        } catch (error) {
            return res.status(500).json({
                status: "Internal server Error!",
                message: "Internal server Error!",
            });
        }
    }

    async getVideosSortedByLRDate(req:Request,res:Response){

        try {

            const videos = await prisma.video.findMany({
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
                result:videos
            });
            
        } catch (error) {
            return res.status(500).json({
                status: "Internal server Error!",
                message: "Internal server Error!",
            });
        }
    }

    async getVideosSortedByPopular(req:Request,res:Response){

        try {

            const videos = await prisma.video.findMany({
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
                result:videos
            });
            
        } catch (error) {
            return res.status(500).json({
                status: "Internal server Error!",
                message: "Internal server Error!",
            });
        }
    }

    async getVideoInformation(req:Request,res:Response){

        const videoId = req.params.videoId;
        try {

            console.log("searching videos",videoId)

            const video = await prisma.video.findUnique({
                where: {
                  videoid: parseInt(videoId),
                },
                include: {
                  user: {
                    select: {
                      name: true,
                    },
                  },
                },
              });
            
            
            if(!video){
                return res.status(200).json({
                    status: "Ok!",
                    message: "No such video exists",
                    result:null
                });

            }
              // to do: handle where the videoId does not exist

            video.videoLink="https://d3f4vrh8x97mrt.cloudfront.net/"+video.videoLink

            console.log(video)
            return res.status(200).json({
                status: "Ok!",
                message: "Video retrieved successfully!",
                result:video
            });
            
        } catch (error) {
            return res.status(500).json({
                status: "Internal server Error!",
                message: "Internal server Error!",
            });
        }


    }

    async getUsers(req:Request,res:Response){

        try {
            
            const videos=await prisma.user.findMany();
            
            return res.status(200).json({
                status: "Ok!",
                message: "C!"
            });
        } catch (error) {
            return res.status(500).json({
                status: "Internal server Error!",
                message: "Internal server Error!",
            });
        }
    }

}
export default new FeedController()