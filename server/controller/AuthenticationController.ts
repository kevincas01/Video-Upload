import { Request, Response } from "express";
import { AuthenticationService } from "../services/Authentication";

class AuthenticationController{

    async login(req:Request,res:Response){

        try {
            const {email,password}=req.body
            
            const token=await new AuthenticationService().login(email,password)

            if (!token){
                return res.status(400).json({
                    status: "Bad Request!",
                    message: "Incorrect Email or Password",
                  });
            }
            const loginToken = { type: "Bearer", token: token };
            return res.status(200).json({
                status: "Ok!",
                message: "Successfully logged in!",
                result: loginToken,
            });

        } catch (error) {
            return res.status(500).json({
                status: "Internal server Error!",
                message: "Internal server Error!",
            });
        }

    }
    async register(req:Request,res:Response){

        try {
            const {name,email,password}=req.body
            await new AuthenticationService().register(name,email,password)

            return res.status(200).json({
                status: "Ok!",
                message: "Successfully registered!"
            });
        } catch (error) {
            return res.status(500).json({
                status: "Internal server Error!",
                message: "Internal server Error!",
            });
        }
    }
}
export default new AuthenticationController()