import statusHistoryRepository
    from "../repositories/status-history.repository";
import { Types } from "mongoose";


class StatusHistoryService {

    async getByTaskId(taskId: string) {

        const objectId  = new Types.ObjectId(taskId)
        return await statusHistoryRepository.findByTaskId(objectId);
    }
}

export default new StatusHistoryService();