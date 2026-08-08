/// <reference types="jest" />

import request from "supertest";
import app from "../app";

import { createTestUser } from "./helpers/user.helper";
import { loginTestUser } from "./helpers/auth.helper";
import { createTestTask } from "./helpers/task.helper";
import StatusHistory from "../models/status-history.model";

describe("Status History API", () => {

    it("should get task status history", async () => {

        const user = await createTestUser();

        const token = await loginTestUser(
            user.email,
            user.password
        );

        const task = await createTestTask(token);

        await request(app)
            .patch(`/api/tasks/${task._id}`)
            .set(
                "Authorization",
                `Bearer ${token}`
            )
            .send({
                status: "completed"
            });

        const response = await request(app)
            .get(`/api/tasks/${task._id}/status-history`)
            .set(
                "Authorization",
                `Bearer ${token}`
            );

        expect(response.statusCode)
            .toBe(200);

        expect(response.body.status)
            .toBe("success");

        expect(Array.isArray(response.body.data))
            .toBe(true);

        expect(response.body.data.length)
            .toBeGreaterThan(0);

        expect(response.body.data[0])
            .toHaveProperty("taskId");

        expect(response.body.data[0].taskId)
            .toBe(task._id);

        expect(response.body.data[0])
            .toHaveProperty("from");

        expect(response.body.data[0])
            .toHaveProperty("to");

        expect(response.body.data[0].to)
            .toBe("completed");

        expect(response.body.data[0])
            .toHaveProperty("changedBy");

        expect(response.body.data[0])
            .toHaveProperty("changedAt");
    });

    it("should reject another user from viewing task status history", async () => {

        const userA = await createTestUser();

        const tokenA = await loginTestUser(
            userA.email,
            userA.password
        );

        const task = await createTestTask(tokenA);


        const userB = await createTestUser();

        const tokenB = await loginTestUser(
            userB.email,
            userB.password
        );


        const response = await request(app)
            .get(`/api/tasks/${task._id}/status-history`)
            .set(
                "Authorization",
                `Bearer ${tokenB}`
            );


        expect(response.statusCode)
            .toBe(403);

    });

   it("should return status history sorted by changedAt", async () => {

        const user = await createTestUser();

        const token = await loginTestUser(
            user.email,
            user.password
        );

        const task = await createTestTask(token);

        await StatusHistory.create([
            {
                taskId: task._id,
                from: "pending",
                to: "in-progress",
                changedBy: task.userId,
                changedAt: new Date("2026-01-01T10:00:00.000Z")
            },
            {
                taskId: task._id,
                from: "in-progress",
                to: "completed",
                changedBy: task.userId,
                changedAt: new Date("2026-01-01T12:00:00.000Z")
            },
            {
                taskId: task._id,
                from: "completed",
                to: "pending",
                changedBy: task.userId,
                changedAt: new Date("2026-01-01T11:00:00.000Z")
            }
        ]);

        const response = await request(app)
            .get(`/api/tasks/${task._id}/status-history`)
            .set(
                "Authorization",
                `Bearer ${token}`
            );

        expect(response.statusCode)
            .toBe(200);

        expect(response.body.data.length)
            .toBe(3);

        expect(response.body.data[0].to)
            .toBe("in-progress");

        expect(response.body.data[1].to)
            .toBe("pending");

        expect(response.body.data[2].to)
            .toBe("completed");

        expect(
            new Date(response.body.data[0].changedAt).getTime()
        ).toBeLessThan(
            new Date(response.body.data[1].changedAt).getTime()
        );

        expect(
            new Date(response.body.data[1].changedAt).getTime()
        ).toBeLessThan(
            new Date(response.body.data[2].changedAt).getTime()
        );
    });

});