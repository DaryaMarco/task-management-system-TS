import taskRepository from "../repositories/task.repository";
import { ITask } from "../interfaces/task.interface";
import AppError from "../utils/AppError";

class TaskService {

    async createTask(taskData: ITask){
        const task = await taskRepository.create(taskData);
        return task;
    }

    async getUserTasks(userId:string){
        const tasks = await taskRepository.findByUserId(userId);
        return tasks;
    }

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

    async updateTask(id:string, data:Partial<ITask>){
        
        return await taskRepository.update(id, data);

    }
    async deleteTask(id:string){
        return await taskRepository.delete(id);
    }

}
export default new TaskService;