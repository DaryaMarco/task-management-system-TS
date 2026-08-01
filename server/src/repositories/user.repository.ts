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
    async findById(id: string){
        return User.findById(id);
    }
}

export default new UserRepository();