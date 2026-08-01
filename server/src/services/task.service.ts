import taskRepository from "../repositories/task.repository";
import { ITask } from "../interfaces/task.interface";
import AppError from "../utils/AppError";
import { HydratedDocument } from "mongoose";
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

   async updateTask(
    task: HydratedDocument<ITask>,
    data: Partial<ITask>
) {

    Object.assign(task, data);

    return await taskRepository.save(task);

}
    async deleteTask(
    task: HydratedDocument<ITask>
) {
    return await taskRepository.delete(task);
}
}
export default new TaskService;