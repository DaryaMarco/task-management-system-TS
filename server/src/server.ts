import dotenv from "dotenv";
dotenv.config();
import app from "./app";
import connectDB  from "./config/db";
import logger from "./config/logger";


const PORT = process.env.PORT || 5000;

const startServer = async (): Promise<void> => {
  try {

    await connectDB();

    app.listen(PORT, () => {
      console.log(
        `Server running on port ${PORT}`
      );
    });

  } catch (error) {

    logger.error(
      "Server startup failed ❌",
      error
    );

    process.exit(1);
  }
};

startServer();