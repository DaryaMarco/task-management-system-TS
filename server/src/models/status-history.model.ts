import { Schema, model } from "mongoose";
import { IStatusHistory } from "../interfaces/status-history.interface";

const statusHistorySchema = new Schema<IStatusHistory>({

    taskId : {
        type : Schema.Types.ObjectId,
        ref: "Task",
        required: true
    },
    from:{
        type : String,
        enum : ["pending", "in-progress", "completed"],
        required : true
    },
     to: {
            type: String,
            enum: ["pending", "in-progress", "completed"],
            required: true,
        },

        changedBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        changedAt: {
            type: Date,
            default: Date.now,
        },
});

statusHistorySchema.index({ taskId: 1, changedAt: 1 });

const StatusHistory = model<IStatusHistory>(
    "StatusHistory",
    statusHistorySchema
);


export default StatusHistory;
