import { Types } from "mongoose";
import { UserRole } from "./role.type";


export interface IUser {

    _id?: Types.ObjectId;
    name: string;
    email: string;
    password: string;
    role: UserRole;

}
