import Task from "../models/task.model";
import { ITask } from "../interfaces/task.interface";
import { HydratedDocument } from "mongoose";
import { ITaskQuery } from "../interfaces/task-query.interface";
import AppError from "../utils/AppError";


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
    async findByUserIdPaginated(query: ITaskQuery){

        const {userId,page,limit,status,priority,sort} = query; 

        const filter : any ={userId};

        if(status){
            filter.status = status;
        }

        if(priority){
            filter.priority = priority;
        }

        const skip = (page -1)* limit;
        let sortOption = {};
        const allowedSortFields = ["title","status","priority","createdAt"];

        if(sort){

            const sortField = sort.startsWith("-")
                ? sort.substring(1)
                : sort;


            const sortOrder = sort.startsWith("-")
                ? -1
                : 1;

            if(!allowedSortFields.includes(sortField)){
                throw new AppError(
                    "Invalid sort field",
                    400
                );
            }
            sortOption = {
                [sortField]: sortOrder
            };

        }
          const task = await Task.find(filter)         
        .sort(sortOption)
        .skip(skip)
        .limit(limit);

        return task;
    }
    async save(task: HydratedDocument<ITask>) {
        return await task.save();
    }

    async delete(task: HydratedDocument<ITask>) {
        return await task.deleteOne();
    }

}


export default new TaskRepository();