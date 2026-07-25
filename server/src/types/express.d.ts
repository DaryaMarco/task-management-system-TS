import { IAuthPayload } from "../interfaces/auth.interface";


declare global {

    namespace Express {

        interface Request {
            user: IAuthPayload;
        }

    }

}


export {};