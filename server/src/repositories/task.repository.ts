import Task from "../models/task.model";
import { ITask } from "../interfaces/task.interface";


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
    async update(
        id: string,
        data: Partial<ITask>
    ) {

        const task = await Task.findByIdAndUpdate(
            id,
            data,
            {
            returnDocument:"after"
            }
        );


        return task;

    }


    async delete(id: string) {

        const task = await Task.findByIdAndDelete(id);

        return task;

    }


}


export default new TaskRepository();