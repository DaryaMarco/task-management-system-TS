import request from "supertest";
import app from "../app";
import { createTestUser } from "./helpers/user.helper";
import { loginTestUser } from "./helpers/auth.helper";
import { createTestTask } from "./helpers/task.helper";
import User from "../models/user.model";


describe("Task API", () => {

   it("should create a task", async ()=>{

    const user = await createTestUser();

    const token = await loginTestUser(
        user.email,
        user.password
    );


    const response = await request(app)
        .post("/api/tasks")
        .set(
            "Authorization",
            `Bearer ${token}`
        )
        .send({
            title:"Learn NodeJS",
            description:"Build Task Management System",
            status:"pending",
            priority:"medium"
        });


    expect(response.statusCode)
        .toBe(201);

                expect(response.body.data.title)
                    .toBe("Learn NodeJS");

                expect(response.body.data.description)
                    .toBe("Build Task Management System");

                expect(response.body.data.status)
                    .toBe("pending");

                expect(response.body.data.priority)
                    .toBe("medium");
                expect(response.body.data)
                    .toHaveProperty("_id");
    });
                
it("should get all user tasks", async()=>{

    const user = await createTestUser();

    const token = await loginTestUser(
        user.email,
        user.password
    );

    await createTestTask(token);


    const response = await request(app)
        .get("/api/tasks")
        .set(
            "Authorization",
            `Bearer ${token}`
        );


    expect(response.statusCode).toBe(200);

    expect(Array.isArray(response.body.data))
        .toBe(true);

    expect(response.body.data.length)
        .toBeGreaterThan(0);

    expect(response.body.data[0])
        .toHaveProperty("_id");

    expect(response.body.data[0])
        .toHaveProperty("title");

    expect(response.body.data[0].title)
        .toBe("Learn NodeJS");

});
    
    it("should get single task", async () => {
    const user = await createTestUser();

    const token = await loginTestUser(
        user.email,
        user.password
    );

    const task = await createTestTask(token);
    const response = await request(app)
        .get(`/api/tasks/${task._id}`)
        .set(
            "Authorization",
            `Bearer ${token}`
        );

    expect(response.statusCode)
        .toBe(200);

    expect(response.body.data)
        .toHaveProperty("_id");

    expect(response.body.data._id)
        .toBe(task._id);

    expect(response.body.data.title)
        .toBe("Learn NodeJS");

    });


    it("should update a task", async ()=>{
        const user = await createTestUser();

        const token = await loginTestUser(
            user.email,
            user.password
        );

        const task = await createTestTask(token);
            const response = await request(app)
                .patch(`/api/tasks/${task._id}`)
                .set(
                    "Authorization",
                    `Bearer ${token}`
                )
                .send({
                    status: "completed"
                });

                expect(response.statusCode).toBe(200);
                expect(response.body.data.status)
                    .toBe("completed");

                expect(response.body.data.title)
                    .toBe("Learn NodeJS");

                expect(response.body.data.priority)
                    .toBe("medium");

                expect(response.body.data._id)
                    .toBe(task._id);    
    });


    it("should delete a task", async ()=>{

        const user = await createTestUser();

        const token = await loginTestUser(
            user.email,
            user.password
        );

        const task = await createTestTask(token);
        const deleteResponse = await request(app)
                .delete(`/api/tasks/${task._id}`)
                .set("Authorization", `Bearer ${token}`);

                expect(deleteResponse.status).toBe(200);

        const getResponse = await request(app)
                .get(`/api/tasks/${task._id}`)
                .set("Authorization", `Bearer ${token}`);

                expect(getResponse.status).toBe(404);
  
    });


    it("should reject without token", async()=>{
        const response = await request(app)
                .post("/api/tasks/")
                .send({
                    title : "Unauthorized Task",
                    description : "No token"
                });

                expect(response.statusCode).toBe(401);
    });

    it("should reject invalid task data", async()=>{
        const user = await createTestUser();

        const token = await loginTestUser(
            user.email,
            user.password
        );
        const response = await request(app)
                .post("/api/tasks")
                .set(
                    "Authorization",
                    `Bearer ${token}`
                )
                .send({
                    description: "Task without title"
                });

                expect(response.statusCode).toBe(400);
    });

    it("should filter tasks by status", async () => {

            const user = await createTestUser();

            const token = await loginTestUser(
                user.email,
                user.password
            );

            const task = await createTestTask(token);


            await request(app)
                .patch(`/api/tasks/${task._id}`)
                .set("Authorization", `Bearer ${token}`)
                .send({
                    status: "completed"
                });
            const response = await request(app)
                .get("/api/tasks?status=completed")
                .set("Authorization", `Bearer ${token}`);

                    expect(response.status).toBe(200);
                    expect(response.body.data.every(
                        (task: any) => task.status === "completed"
                    )).toBe(true);

            });

    it("should search tasks", async () => {
                const user = await createTestUser();

                const token = await loginTestUser(
                    user.email,
                    user.password
                );

             await createTestTask(token);

            const response = await request(app)
                .get("/api/tasks?search=node")
                .set("Authorization", `Bearer ${token}`);

                expect(response.status).toBe(200);

                expect(response.body.data.every((task: any)=> task.title.toLowerCase().includes("node"))).toBe(true);
           });

    it("should paginate tasks", async () => {
        const user = await createTestUser();

        const token = await loginTestUser(
            user.email,
            user.password
        );

        await createTestTask(token);
            const response = await request(app)
                .get("/api/tasks?page=1&limit=2")
                .set("Authorization", `Bearer ${token}`);

                expect(response.status).toBe(200);
                expect(response.body.data.length)
                .toBeLessThanOrEqual(2);
    });

    
    it("should return 404 when task does not exist", async () => {
        const user = await createTestUser();

        const token = await loginTestUser(
            user.email,
            user.password
        );
        const response = await request(app)
            .get("/api/tasks/507f1f77bcf86cd799439011")
            .set(
                "Authorization",
                `Bearer ${token}`
            );


        expect(response.status).toBe(404);

        expect(response.body).toEqual({
            status: "fail",
            message: "Task not found"
        });

    });

    it("should reject another user from viewing the task", async () => {

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
            .get(`/api/tasks/${task._id}`)
            .set(
                "Authorization",
                `Bearer ${tokenB}`
            );


        expect(response.statusCode)
            .toBe(403);
    });

    it("should reject another user from updating the task", async () => {

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
            .patch(`/api/tasks/${task._id}`)
            .set(
                "Authorization",
                `Bearer ${tokenB}`
            )
            .send({
                status: "completed"
        });


            expect(response.statusCode)
            .toBe(403);

    });

    it("should reject another user from deleting the task", async () => {

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
            .delete(`/api/tasks/${task._id}`)
            .set(
                "Authorization",
                `Bearer ${tokenB}`
            );


        expect(response.statusCode)
            .toBe(403);
    });

        it("should reject invalid token", async () => {

            const response = await request(app)
                .get("/api/tasks")
                .set(
                    "Authorization",
                    "Bearer invalid-token"
                );

            expect(response.statusCode)
                .toBe(401);
    });

    it("should reject regular user from accessing admin route", async () => {

            const user = await createTestUser();

            const token = await loginTestUser(
                user.email,
                user.password
            );

            const response = await request(app)
                .get("/api/users")
                .set(
                    "Authorization",
                    `Bearer ${token}`
                );

            expect(response.statusCode)
                .toBe(403);
    });

    it("should allow admin user to access admin route", async () => {

        const user = await createTestUser();

        await User.updateOne(
            { email: user.email },
            { role: "admin" }
        );

        const token = await loginTestUser(
            user.email,
            user.password
        );

        const response = await request(app)
            .get("/api/users")
            .set(
                "Authorization",
                `Bearer ${token}`
            );

        expect(response.statusCode)
            .toBe(200);

        expect(Array.isArray(response.body.result))
            .toBe(true);
        
    });

    it("should return 404 when task does not exist for status history", async () => {

    const user = await createTestUser();

    const token = await loginTestUser(
        user.email,
        user.password
    );

    const response = await request(app)
        .get("/api/tasks/507f1f77bcf86cd799439011/status-history")
        .set(
            "Authorization",
            `Bearer ${token}`
        );

    expect(response.statusCode)
        .toBe(404);
    });

    it("should reject invalid task update data", async () => {

    const user = await createTestUser();

    const token = await loginTestUser(
        user.email,
        user.password
    );

    const task = await createTestTask(token);

    const response = await request(app)
        .patch(`/api/tasks/${task._id}`)
        .set(
            "Authorization",
            `Bearer ${token}`
        )
        .send({
            status: "invalid-status"
        });

    expect(response.statusCode)
        .toBe(400);
    });
    

it("should allow admin to delete a user", async () => {

    const admin = await createTestUser();

    await User.updateOne(
        { email: admin.email },
        { role: "admin" }
    );

    const adminToken = await loginTestUser(
        admin.email,
        admin.password
    );


    const targetUser = await createTestUser();

    const targetUserDocument = await User.findOne({
        email: targetUser.email
    });


    const response = await request(app)
        .delete(`/api/users/${targetUserDocument!._id}`)
        .set(
            "Authorization",
            `Bearer ${adminToken}`
        );


    expect(response.statusCode)
        .toBe(200);

    expect(response.body.message)
        .toBe("User deleted successfully");
});

    it("should reject regular user from deleting another user", async () => {

    const userA = await createTestUser();

    const tokenA = await loginTestUser(
        userA.email,
        userA.password
    );


    const userB = await createTestUser();

    const userBDocument = await User.findOne({
        email: userB.email
    });


    const response = await request(app)
        .delete(`/api/users/${userBDocument!._id}`)
        .set(
            "Authorization",
            `Bearer ${tokenA}`
        );


    expect(response.statusCode)
        .toBe(403);
    });

});

