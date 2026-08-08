import taskRepository from "../repositories/task.repository";
import { ITask } from "../interfaces/task.interface";
import AppError from "../utils/AppError";
import { HydratedDocument } from "mongoose";
import { ITaskQuery } from "../interfaces/task-query.interface";
import statusHistoryRepository from "../repositories/status-history.repository";
import { Types } from "mongoose";

class TaskService {
// createTask

    async createTask(taskData: ITask){
        const task = await taskRepository.create(taskData);
        return task;
    }
// getUserTasks

    async getUserTasks(query : ITaskQuery){
        
        return await taskRepository.findByUserIdPaginated(query);
    }
    
// getTaskById

   async getTaskById(id:string){

    const task = await taskRepository.findById(id);

    if(!task){

        throw new AppError(
            "Task not found",
            404
        );

    }
    return task;

    }
// updateTask

   async updateTask(
        task: HydratedDocument<ITask>,
        data: Partial<ITask>,
        userId: Types.ObjectId
    ) {
        const oldstatus = task.status;

        Object.assign(task, data);

       const updatedTask = await taskRepository.save(task);

        if(data.status && data.status !== oldstatus){

            const newtatus = data.status;

            await statusHistoryRepository.create({
                taskId : task._id,
                from : oldstatus,
                to : newtatus,
                changedBy : userId,
                changedAt : new Date()
            });
        }

        return updatedTask;
    }
// deleteTask

    async deleteTask(
        task: HydratedDocument<ITask>
    ) {
        return await taskRepository.delete(task);
    }
}


export default new TaskService;