import { HydratedDocument } from "mongoose";
import { IUser } from "../interfaces/user.interface";
import userRepository from "../repositories/user.repository";


class UserService {

    async getUsers() {
        return await userRepository.findAll();
    }


    async deleteUser(
        user: HydratedDocument<IUser>
    ) {

        return await userRepository.delete(user);

    }

}


export default new UserService();