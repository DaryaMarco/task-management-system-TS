import { Request, Response } from "express";
import userService from "../services/user.service";

class UserController {

    async getUsers(
        req: Request,
        res: Response
    ) {

        const users =
            await userService.getUsers();

        res.status(200).json({
            result: users
        });

    }

    async deleteUser(
        req: Request,
        res: Response
    ) {

        await userService.deleteUser(
            req.targetUser
        );

        res.status(200).json({
            message: "User deleted successfully"
        });

    }

}

export default new UserController();