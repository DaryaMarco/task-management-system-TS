import { HydratedDocument } from "mongoose";
import User from "../models/user.model";
import { IUser } from "../interfaces/user.interface";

class UserRepository {

    async findByEmail(
        email: string
    ): Promise<HydratedDocument<IUser> | null> {

        return await User.findOne({
            email
        });

    }

    async findById(
        id: string
    ): Promise<HydratedDocument<IUser> | null> {

        return await User.findById(id);

    }

    async findAll(): Promise<HydratedDocument<IUser>[]> {

        return await User.find().select("-password");

    }

    async create(
        userData: IUser
    ): Promise<HydratedDocument<IUser>> {

        return await User.create(
            userData
        );

    }

    async save(
        user: HydratedDocument<IUser>
    ) {

        return await user.save();

    }

    async delete(
        user: HydratedDocument<IUser>
    ) {

        return await user.deleteOne();

    }

}

export default new UserRepository();