import StatusHistory from "../models/status-history.model";
import { IStatusHistory } from "../interfaces/status-history.interface";

class StatusHistoryRepository{

    async create(data:IStatusHistory){
        return await StatusHistory.create(data);
    }

    async findByTaskId(taskId: IStatusHistory["taskId"]){
        return await StatusHistory.find({taskId})
        .sort({changedAt : 1});
    
    }
}

export default new StatusHistoryRepository;