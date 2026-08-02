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


        async assignTask(
            req: Request,
            res: Response
        ) {

            const task = await taskService.createTask(
                {
                    ...req.body,
                    userId: req.body.userId
                }
            );

            res.status(201).json({
                status: "success",
                data: task
            });

    }    

    async getMyTasks(req:Request, res:Response){

        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const userId = req.user.id;

        const tasks = await taskService.getUserTasks(userId,page,limit);
        
        res.status(200).json({
            status: "success",
                ...tasks
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
            req.task,
            req.body
        );

        res.status(200).json({
            status: "success",
            data: task
        });

    }

    async deleteTask(
        req: Request<{ id: string }>,
        res: Response
    ) {

        await taskService.deleteTask(
            req.task
        );

        res.status(200).json({
            message: "Task deleted successfully"
        });

    }
}

export default new TaskController();