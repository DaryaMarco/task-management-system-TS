import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import AppError from "../utils/AppError";
import userRepository from "../repositories/user.repository";
import { IUser } from "../interfaces/user.interface";
import type {ILoginResponse} from "../interfaces/auth.interface";

class AuthService {
    // REGISTER
        async register (userData : IUser):Promise<IUser>{

            const existingUser =
            await userRepository.findByEmail(
                userData.email
            );

            if(existingUser){
                throw new Error (
                    "Email already exist!"
                );
            }
            const hashPassword =
                await bcrypt.hash(
                    userData.password,
                    10
                );

            const user =await userRepository.create({
                ...userData,
                password: hashPassword
            });
            
            return user;

        }

// LOGIN
       async login(email:string, password:string):Promise<ILoginResponse>
       {
        const user = await userRepository.findByEmail(email);

        if(!user){
            throw new AppError(
                "Invalid email or password.",
                409
            );
        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if(!isMatch){
            throw new AppError(
                "Invalid email or password",
                401
            );
        }
        const token = jwt.sign(
            {
            id: user._id!.toString(),
            email: user.email       
            },
            process.env.JWT_SECRET!,
            {
            expiresIn: "7d"
            }
        );
        return {
            token,
            user :{
                id : user._id!.toString(),
                name : user.name,
                email: user.email
            }
        }
        
       }

}


export default new AuthService();