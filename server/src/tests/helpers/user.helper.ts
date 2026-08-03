import request from "supertest";
import app from "../../app";


export async function createTestUser() {

    const email = `test${Date.now()}@test.com`;
    const password = "123456";

    await request(app)
        .post("/api/auth/register")
        .send({
            name: "Test User",
            email,
            password
        });
    return {
    email,
    password
};
}