import request from "supertest";
import app from "../../app";
 
export async function loginTestUser(  email:string, password:string) {


       const response = await request(app)
                .post("/api/auth/login")
                .send({
                    email,
                    password,
                });

          return response.body.result.accessToken;

}