import { Request, Response } from "express";
import Video from "../utils/Video";
import { prisma } from "../db";
import Authentication from "../utils/Authentication";
// import { Video } from "../services/Videos";


class FeedController{
    //   title  String
    //   description String  
    //   link String -HAVE TO CREATE 
    //   datePosted DateTime -HAVE TO CREATE 
    //   tag String[]
    //   user

    async postVideo(req:Request,res:Response){

        try {
            
            const {title,videoContent,description,tags}=req.body
            

            // Have to create the link so we can send it to the AWS cloudfront
            const generatedLink="www.test.com"
            const currentDatetime= Video.getCurrentDatetime()
            const userId=req.app.locals.credentials.userId 
            
            const video=await prisma.video.create({
                data: {
                    title:title,
                    description:description,
                    link: generatedLink,
                    datePosted:currentDatetime,
                    tag:tags,
                    userId:userId
                },
            })
            
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
            console.log("getting users")
            console.log(req.app.locals.credentials)
            // CHANGE TO VIDEOS LATER
            const videos=await prisma.user.findMany();
            
            return res.status(200).json({
                status: "Ok!",
                message: "Successfully registered!",
                result:videos
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