import Task from "../models/task.model";
import { ITask } from "../interfaces/task.interface";
import { HydratedDocument } from "mongoose";


class TaskRepository {


    async create(taskData: ITask) {

        const task = await Task.create(taskData);

        return task;

    }


    async findAll() {

        const tasks = await Task.find();

        return tasks;

    }


    async findById(id: string) {

        const task = await Task.findById(id);

        return task;

    }

    async findByUserId(userId: string){
        const tasks = await Task.find({userId});
                return tasks;

    }

    async save(task: HydratedDocument<ITask>) {
        return await task.save();
    }

    async delete(task: HydratedDocument<ITask>) {
        return await task.deleteOne();
    }


}


export default new TaskRepository();