import bcrypt from 'bcrypt'


import { prisma } from "../db";
import Authentication from "../utils/Authentication";
import {UserDbMethods} from '../database/UserMethods'

interface IAuthenticationService {
    login(email: string, password: string): Promise<string>;
    register(
        name: string,
        email: string,
        password: string,
    ): Promise<void>;
  }


export class AuthenticationService{

    async login(email: string, password: string): Promise<string> {

        const user = await new UserDbMethods().getByEmail(email)

        if(!user){
            return ""
        }
        
        const isMatch= await Authentication.comparePassword(password,user.password)
    
        if(isMatch){
            const token=Authentication.generateToken(user.id,user.name,user.email)
            return token
        }
        return ""

    }

    async register(name:string,email:string,password:string):Promise<void>{

        try {
            
            const users = await prisma.user.findUnique({
                where: {
                    email: email
                }
            })
            
            if (users){
                throw new Error("User already exists with this email")
            }
            
            const hashedPassword= await Authentication.hashPassword(password)
            
            const user = await prisma.user.create({
                data: {
                    name: name,
                    email: email,
                    password:hashedPassword,
                },
            })
        } 
        catch (error) {
            throw new Error("Problem registering. Please try again.")            
        }
    }
}

export default new AuthenticationService()