import { ITask } from "./task.interface";

export interface ITaskQuery {
    userId: string;
    page: number;
    limit: number;
    status?: ITask["status"];
    priority?: ITask["priority"];
    sort?: string;
}