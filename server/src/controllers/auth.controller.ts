import {Request, Response} from "express";
import authService from "../services/auth.service";

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

           res.status(200).json({
            result
           })
        }
}

export default new AuthController();