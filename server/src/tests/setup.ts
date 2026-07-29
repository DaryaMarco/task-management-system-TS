import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongoServer: MongoMemoryServer;


beforeAll(async () => {

    mongoServer = await MongoMemoryServer.create();

    await mongoose.connect(
        mongoServer.getUri()
    );

});


afterEach(async()=>{

    const collections = mongoose.connection.collections;

    for(const key in collections){
        await collections[key].deleteMany({});
    }

});


afterAll(async()=>{

    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongoServer.stop();

});