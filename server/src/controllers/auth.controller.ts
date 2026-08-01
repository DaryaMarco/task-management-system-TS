import {Request, Response} from "express";
import authService from "../services/auth.service";
import AppError from "../utils/AppError";

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

        async refresh(
            req: Request,
            res: Response
        ): Promise<void> {

            const refreshToken = req.cookies.refreshToken;

            if(!refreshToken){
                throw new AppError(
                    "Refresh token not found",
                    401
                );
            }

            const result = await authService.refreshAccessToken(
                refreshToken
            );

            res.status(200).json({
                result
            });
        }

        async logout(
            req: Request,
            res: Response
        ): Promise<void>{

            const refreshToken = req.cookies.refreshToken;

            if(refreshToken){

                await authService.logout(
                    refreshToken
                );

            }

            res.clearCookie("refreshToken",{
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                }
            );

            res.status(200).json({
                message:"Logged out successfully"
            });
}
}

export default new AuthController();