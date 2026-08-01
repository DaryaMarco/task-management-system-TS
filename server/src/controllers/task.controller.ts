import taskService from "../services/task.service";
import { Request, Response } from "express";

class TaskController {

        async createTask(req: Request, res: Response){
            const task =await taskService.createTask(
            { ...req.body,
                userId : req.user.id}
            );

            res.status(201).json({
                status:"success",
                data:task
            });
        }

    async getMyTasks(req:Request, res:Response){
        
        const userId = req.user.id;

        const tasks = await taskService.getUserTasks(userId);
        
        res.status(200).json({
            status: "success",
            data : tasks
        })

    }
    async getTask(req:Request<{ id: string }>,res:Response){

    const task = await taskService.getTaskById(
        req.params.id
    );


    res.status(200).json({
        status:"success",
        data:task
    });

    }

    async updateTask(
                req: Request<{ id: string }>,
                res: Response
                ) {

    const task = await taskService.updateTask(
        req.params.id,
        req.body
    );


    res.status(200).json({
        status: "success",
        data: task
    });

    }

    async deleteTask(req:Request<{ id: string }>,res:Response){

        await taskService.deleteTask(
            req.params.id
        );


        res.status(200).json({
            message:"Task deleted successfully"
        });

        }
}

export default new TaskController();