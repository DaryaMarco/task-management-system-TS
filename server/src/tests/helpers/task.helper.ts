import request from "supertest";
import app from "../../app";


export async function createTestTask(token:string) {

    const response = await request(app)
        .post("/api/tasks")
        .set(
            "Authorization",
            `Bearer ${token}`
        )
        .send({
            title: "Learn NodeJS",
            description: "Build Task Management System",
            status: "pending",
            priority: "medium"
        });


    return response.body.data;
}