import { Request, Response } from "express";
import statusHistoryService from "../services/status-history.service";

class StatusHistoryController {

    async getByTaskId(
        req: Request<{ id: string }>,
        res: Response
    ) {

        const history = await statusHistoryService.getByTaskId(
            req.params.id
        );

        res.status(200).json({
            status: "success",
            data: history
        });
    }
}

export default new StatusHistoryController();