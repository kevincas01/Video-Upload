import { Request, Response } from "express";
import { prisma } from "../db";

class VideoController{

    async createComment(req:Request,res:Response){

        try {
            const { videoId } = req.params;

            const {comment}=req.body
            const user=req.app.locals.credentials
            const newComment = await prisma.comment.create({
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

        } catch (error) {
            return res.status(500).json({
                status: "Internal server Error!",
                message: "Internal server Error!",
            });
        }

    }
    async getComments(req:Request,res:Response){

        try {
            const { videoId } = req.params;
            const comments = await prisma.comment.findMany({
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
                result:comments
            });

        } catch (error) {
            return res.status(500).json({
                status: "Internal server Error!",
                message: "Internal server Error!",
            });
        }

    }
    
}
export default new VideoController()