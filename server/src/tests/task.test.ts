import request from "supertest";
import app from "../app";


let token:string;
let taskId:string;

describe("Task API", () => {

                
    beforeEach(async ()=>{

       const email = `test${Date.now()}@test.com`; 

    const register = await request(app)
        .post("/api/auth/register")
        .send({
            name: "Test User",
            email,
            password: "123456"
        });

    const login = await request(app)
                  .post("/api/auth/login")
                  .send({
                    email,
                    password:"123456"
                  });

            token = login.body.result.token;

    const task = await request(app)
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

        taskId = task.body.data._id;

    });

  
    it("should create a task", async ()=>{
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


                expect(response.body.data)
                      .toHaveProperty("title");
        });

    it("should get user taks", async()=>{

        const response = await request(app)
                        .get("/api/tasks")
                        .set(
                            "Authorization",
                            `Bearer ${token}`
                        );
                expect(response.statusCode).toBe(200);
                expect(response.body.data).toBeInstanceOf(Array);
    });
    
    
    it("should get single task", async () => {

    const response = await request(app)
        .get(`/api/tasks/${taskId}`)
        .set(
            "Authorization",
            `Bearer ${token}`
        );

    expect(response.statusCode)
        .toBe(200);

    expect(response.body.data)
        .toHaveProperty("_id");

    expect(response.body.data._id)
        .toBe(taskId);

    expect(response.body.data.title)
        .toBe("Learn NodeJS");

    });


    it("should update a task", async ()=>{

        const response = await request(app)
                        .patch(`/api/tasks/${taskId}`)
                        .set(
                            "Authorization",
                            `Bearer ${token}`
                        )
                        .send({
                            status: "completed"
                        });

                        expect(response.statusCode).toBe(200);
                        expect(response.body.data.status).toBe("completed");
    });


    it("should delete a task", async ()=>{
        const response = await request(app)
                        .delete(`/api/tasks/${taskId}`)
                        .set(
                            "Authorization",
                            `Bearer ${token}`
                        );
                        expect(response.statusCode).toBe(200);
                        expect(response.body.message).toBe("Task deleted successfully");
  
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

});

describe("Task Error Handling", () => {

    it("should return 404 when task does not exist", async () => {

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

});
