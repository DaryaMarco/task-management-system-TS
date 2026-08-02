import taskRepository from "../repositories/task.repository";
import { ITask } from "../interfaces/task.interface";
import AppError from "../utils/AppError";
import { HydratedDocument } from "mongoose";
import { ITaskQuery } from "../interfaces/task-query.interface";

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
        data: Partial<ITask>
    ) {

        Object.assign(task, data);

        return await taskRepository.save(task);

    }
// deleteTask

    async deleteTask(
        task: HydratedDocument<ITask>
    ) {
        return await taskRepository.delete(task);
    }
}


export default new TaskService;