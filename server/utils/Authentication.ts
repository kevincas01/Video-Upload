import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";



interface Payload {
  userId: number;
  name: string;
  email: string;
}


class Authentication{
    public static hashPassword(password:string):Promise<string>{
        return bcrypt.hash(password,13)
    }

    public static comparePassword(originalPassword:string,hashedPassword:string):Promise<boolean>{
        const match=bcrypt.compare(originalPassword, hashedPassword)
        
        return match
    }
    public static generateToken(id:number,name:string,email:string):string{
        const payload={
            userId:id, 
            name:name,
            email:email
        }
        const secretKey=process.env.JWT_SECRET_KEY || "secretKey";
        const expireTime={expiresIn:process.env.JWT_EXPIRE_TIME}
        
        const token= jwt.sign(payload, secretKey, expireTime)
        return token
    }

    public static verifyToken(token:string):Payload | null{
        try {
            const secretKey: string = process.env.JWT_SECRET_KEY || "secretKey";

            return jwt.verify(token, secretKey) as Payload;
          } catch (err) {
            return null;
          }

    }



}

export default Authentication