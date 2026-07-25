import mongoose, {Schema, Document} from "mongoose";
import { ITask } from "../interfaces/task.interface";

export interface ITaskDocument extends ITask, Document {}

const taskSchema = new Schema<ITaskDocument>(
    {
        title : {
            type: String,
            required:true,
            trim: true
        },
          description: {
            type: String,
            trim: true,
        },
        status: {
            type: String,
            enum: [
                "pending",
                "in-progress",
                "completed"
            ],
            default:"pending"
        },
        priority:{
            type:String,
            enum: [
                "low",
                "medium",
                "high"
            ],
            default: "medium",
        },
           userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        }

    },

    {
        timestamps: true,
    }
);



const Task = mongoose.model<ITaskDocument>(
    "task",
    taskSchema
);

export default Task;