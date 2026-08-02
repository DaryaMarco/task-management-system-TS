import {Types } from "mongoose";

export interface ITask{

    title : string;
    description?: string;
    status:"pending"| "in-progress"| "completed";
    priority : "low"| "medium" | "high";
    userId:Types.ObjectId
}

// interface ITask {

//     title: string;

//     description: string;

//     status: TaskStatus;

//     priority: TaskPriority;

//     createdBy: Types.ObjectId;

//     assignedTo: Types.ObjectId;

// }