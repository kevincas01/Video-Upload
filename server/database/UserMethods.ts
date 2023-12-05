import { User } from "@prisma/client"
import { create } from "domain"
import { prisma } from "../db";

interface IUserDbMethods{

    create(user:User): Promise<void>;
    update(userId:number, userInfo:User): Promise<User>
    delete(userId:number):Promise<void>
    getById(userId:number): Promise<User>
    getByEmail(email:string): Promise<User>
    getAllUsers():Promise<User[]>

}
export class UserDbMethods implements IUserDbMethods{

    async create(user:User):Promise<void>{

        try {
            await prisma.user.create({
                data: {
                    name: user.name,
                    email: user.email,
                    password:user.password,
                },
            })
            
        } catch (error) {
            throw new Error("Failed to create user! Please try again")
        }
    }

    async update(userId:number,userInfo:User):Promise<User>{

        const user= await prisma.user.findUnique({
            where:{
                id:userId
            }
        })

        if(!user){
            throw new Error("User ")
        }

        const updatedUser=await prisma.user.update({
            where:{
                id:userId
            },
            data:userInfo
        })

        if(!updatedUser){
            throw new Error("Failed to update user")
        }
        return updatedUser


    }

    async delete(userId:number):Promise<void>{


        try {
            await prisma.user.delete({
                where: {
                  id: userId,
                },
              });
            
        } catch (error) {
            throw new Error("Failed to delete user! Please try again")
        }
    }

    async getById(userId:number):Promise<User>{

        const user= await prisma.user.findUnique({
            where: {
              id: userId,
            },
          });

        if (!user) {
        // Handle the case where the user is not found, e.g., throw an error
        throw new Error(`User with ID ${userId} not found`);
        }

        return user
    }

    async getByEmail(email: string): Promise<User> {
        const user= await prisma.user.findUnique({
            where: {
              email: email,
            },
          });

          if (!user) {
            // Handle the case where the user is not found, e.g., throw an error
            throw new Error(`User with email ${email} not found`);
            }

          return user
    }
    async getAllUsers(): Promise<User[]> {
        
        const users=await prisma.user.findMany()

        if (!users){
            throw new Error("Could not retrieve all Users");

        }
        return users

    }

}