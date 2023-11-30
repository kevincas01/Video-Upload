import express, {Express, Request, Response} from 'express'
import { Prisma, PrismaClient } from "@prisma/client";

import { prisma } from "../db";
import bcrypt from 'bcrypt'

const usersRouter=express.Router()


usersRouter.get('/', async(req:Request, res:Response)=>{

    try {
        const users=await prisma.user.findMany();

        res.send(users)
        
    } catch (error) {
        console.log(error)
    }
})


export {usersRouter}