import dotenv from "dotenv";

dotenv.config();
import mongoose  from "mongoose";
import {MongoMemoryServer} from "mongodb-memory-server";

let mongoServer : MongoMemoryServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();

    const uri = mongoServer.getUri();

    await mongoose.connect(uri);
});

afterEach(async ()=>{
    const collections = mongoose.connection.collections;
    for( const key in collections){
        await collections[key].deleteMany({});
    }

});

afterAll(async ()=>{
    await mongoose.connection.close();
    if(mongoServer){
        await mongoServer.stop();
    }
});


