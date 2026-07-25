import request from "supertest";
import app from "../app";

describe ("Auth API", ()=>{

    it("should register user successfully",async ()=>{
        const response = await request(app)
                        .post("/api/auth/register")
                        .send({
                            name:"Test User",
                            email:`test${Date.now()}@test.com`,
                            password:"123456"
                        });
                            console.log(response.body);
                            console.log(response.text);
                        expect(response.statusCode).toBe(201);

    });
    it("should reject duplicate email", async()=>{

    const user = {
        name:"Duplicate User",
        email:`duplicate${Date.now()}@test.com`,
        password:"123456"
    };

    await request(app)
        .post("/api/auth/register")
        .send(user);


    const response = await request(app)
        .post("/api/auth/register")
        .send(user);


        expect(response.statusCode).toBe(500);

    });

    it("should login successfully", async()=>{

    const user = {
        name:"Login User",
        email:`login${Date.now()}@test.com`,
        password:"123456"
    };


    await request(app)
        .post("/api/auth/register")
        .send(user);


    const response = await request(app)
        .post("/api/auth/login")
        .send({
            email:user.email,
            password:user.password
        });


        expect(response.statusCode).toBe(200);
        expect(response.body.result)
        .toHaveProperty("token");

    });

    it("should login successfully", async()=>{

            const user =  {
            name:"Login User",
            email:`login${Date.now()}@test.com`,
            password:"123456"
        };

        await request(app)
                .post("/api/auth/register")
                .send(user);  
                
        const response = await request(app)
        .post("/api/auth/login")
        .send({
            email:user.email,
            password:"wrongPassword"
        });

        expect(response.statusCode).toBe(401);



 });


})