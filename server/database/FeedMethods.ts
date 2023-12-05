import { Video } from "@prisma/client";
import { prisma } from "../db";

interface IVideoDbMethods{
    getVideosByTag(page:number, tag:string):Promise<Video[]>
    getVideosBySearch(page:number,searchString:string):Promise<Video[]>
    getVideosByUser(page:number, userId:number):Promise<Video[]>
    
}


export class VideoDbMethods implements IVideoDbMethods{

    async getVideosByTag(page:number, tag: string): Promise<Video[]> {
        const skip = (page - 1) * 15;
        const videos=await prisma.video.findMany({
            skip: skip,
            take: 15,
            where:{
                tag:{
                    hasEvery:[tag]
                }
            },
            orderBy: {
                title: 'desc',
            },

        })
        if(!videos){
            throw new Error("Failed to get videos with tag")
        }

        return videos

    }

    async getVideosBySearch(page: number, searchString: string): Promise<Video[]> {
        const skip = (page - 1) * 15;
        const videos= await prisma.video.findMany({
            skip:skip,
            take:15,
            where:{
                title:{
                    contains:searchString
                }
            },
            orderBy: {
              title: 'desc',
            },
          
        })

        if(!videos){
            throw new Error("Failed to get videos with search input")
        }

        return videos
    }

    async getVideosByUser(page: number, userId: number): Promise<Video[]> {
        const skip = (page - 1) * 15;
        
        const videos= await prisma.video.findMany({
            skip:skip,
            take:15,
            where:{
                userId:userId
            },
            orderBy: {
              title: 'desc',
            },
          
        })

        if(!videos){
            throw new Error("Failed to get videos with search input")
        }

        return videos
    }


}
