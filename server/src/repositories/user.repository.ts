import User from "../models/user.model";
import {IUser} from "../interfaces/user.interface";


class UserRepository {
    async findByEmail(email:string):
    Promise<IUser | null>{
        return await User.findOne({
            email
        });
    }
    async create(userData: IUser):Promise<IUser>{
        return await User.create(
            userData
        );
    }
}

export default new UserRepository();