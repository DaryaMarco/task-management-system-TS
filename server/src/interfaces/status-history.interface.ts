import { Types } from "mongoose";

export interface IStatusHistory {
    taskId: Types.ObjectId;
    from: "pending" | "in-progress" | "completed";
    to: "pending" | "in-progress" | "completed";
    changedBy: Types.ObjectId;
    changedAt: Date;
}