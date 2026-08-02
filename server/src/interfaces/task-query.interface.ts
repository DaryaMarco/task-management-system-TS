import { ITask } from "./task.interface";
import { TaskSortField } from "./task-sort.interface";

export interface ITaskQuery {
    userId: string;
    page: number;
    limit: number;
    status?: ITask["status"];
    priority?: ITask["priority"];
    sort?: TaskSortField | `-${TaskSortField}`;
}