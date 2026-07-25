import {Request, Response, NextFunction} from "express";
import { ObjectSchema } from "joi";

const validate = (schema : ObjectSchema) => ( req:Request, res : Response, next : NextFunction)=>{

    const {error } = schema.validate(req.body);

        if (error) {
            return res.status(400).json({
                status: "fail",
                message: error.details[0].message
            });
        }

        next();

}


export default validate;