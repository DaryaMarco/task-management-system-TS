import { IAuthPayload } from "../interfaces/auth.interface";
import { HydratedDocument } from "mongoose";
import { ITask } from "../interfaces/task.interface";
import { IUser } from "../interfaces/user.interface";

declare global {

    namespace Express {

        interface Request {
            user: IAuthPayload;
            task: HydratedDocument<ITask>;
            targetUser: HydratedDocument<IUser>;
        }

    }

}


export {};