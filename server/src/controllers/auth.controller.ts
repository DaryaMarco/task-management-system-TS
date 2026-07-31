import {Request, Response} from "express";
import authService from "../services/auth.service";

const REFRESH_COOKIE_MAX_AGE =  7*24*60*60*1000;
class AuthController {

    async register(
        req:Request,
        res:Response,
    ):Promise<void>{

        await authService.register(req.body);
        
        res.status(201).json({
            message : "User successfully Registered"
        });

    }

    async login(
        req: Request,
        res: Response
     ): Promise<void> {

           const {email, password} = req.body;

           const result = await authService.login(
            email,
            password
           )

           console.log("CONTROLLER VERSION 2");
           console.log(result);

           res.cookie("refreshToken", result.refreshToken, {
            httpOnly : true,
            secure : process.env.NODE_ENV === "production",
            sameSite : "strict",
            maxAge :REFRESH_COOKIE_MAX_AGE,
           });

           console.log("LOGIN CONTROLLER HIT");
           res.status(200).json({
            result:{
                accessToken : result.accessToken,
                user : result.user
            },
           });
        }
}

export default new AuthController();