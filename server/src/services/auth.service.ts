import bcrypt from "bcryptjs";
import AppError from "../utils/AppError";
import userRepository from "../repositories/user.repository";
import { IUser } from "../interfaces/user.interface";
import type {ILoginResponse} from "../interfaces/auth.interface";
import { generateAccessToken } from "../utils/jwt.util";
import refreshTokenRepository from "../repositories/refreshToken.repository";
import { generateRefreshToken, hashRefreshToken } from "../utils/token.util";
import {IRefreshResponse} from "../interfaces/auth.interface"
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
        };
        const accessToken = generateAccessToken({
        id: user._id!.toString(),
        role: user.role,
    });


        const refreshToken = generateRefreshToken();

        const hashedToken = hashRefreshToken(refreshToken);

        await refreshTokenRepository.create({
            userId: user._id!.toString(),
            hashedToken,
            expiresAt: new Date(
                Date.now() + 7 * 24 * 60 * 60 * 1000
            ),
        });
        return {
            accessToken,
            refreshToken,
            user: {
                id: user._id!.toString(),
                name: user.name,
                email: user.email,
    },
  } 
}

    async refreshAccessToken(
        refreshToken:string
    ):Promise<IRefreshResponse>{

        const hashedToken = hashRefreshToken(refreshToken);

        const storedToken =
            await refreshTokenRepository.findByToken(
                hashedToken
            );

        if(!storedToken){
            throw new AppError(
                "Invalid refresh token",
                401
            );
        }

        const user = await userRepository.findById(
            storedToken.userId.toString()
        );

        if(!user){
            throw new AppError(
                "User not found",
                404
            );
        }
        const accessToken = generateAccessToken({
            id: storedToken.userId.toString(),
            role: "user",
        });

        return {
            accessToken
        };
    }

    async logout(refreshToken:string):Promise<void>{

        const hashedToken = hashRefreshToken(refreshToken);

        await refreshTokenRepository.deleteByToken(
            hashedToken
        );

    }

}




export default new AuthService();