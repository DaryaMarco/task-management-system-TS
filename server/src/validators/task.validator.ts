import Joi  from "joi";
import { title } from "node:process";


export const createTaskSchema = Joi.object({
    title : Joi
            .string()
            .required()
            .min(3)
            .max(100),

    description : Joi
            .string()
            .max(500)
            .optional(),
    status : Joi
            .string()
            .valid("pending", "in-progress", "completed")
            .default("pending"),
    priority: Joi
            .string()
            .valid("low","medium","high")
            .required()
            .default("high"),

});

export const updateTaskSchema = Joi.object({

    title: Joi
        .string()
        .min(3)
        .max(100),

    description: Joi
        .string()
        .max(500),

    status: Joi
        .string()
        .valid(
            "pending",
            "in-progress",
            "completed"
        ),

    priority: Joi
        .string()
        .valid(
            "low",
            "medium",
            "high"
        )

}).min(1);