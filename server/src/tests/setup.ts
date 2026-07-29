import mongoose from "mongoose";

beforeAll(async () => {
  await mongoose.connect(
    process.env.MONGO_URI || "mongodb://localhost:27017/task-management-test"
  );
});


afterEach(async () => {
  const collections = mongoose.connection.collections;

  for (const key in collections) {
    await collections[key].deleteMany({});
  }
});


afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});