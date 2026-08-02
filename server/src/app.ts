import express from "express";
import authRoutes from "./routes/auth.routes" ;
import taskRoute from "./routes/task.route";
import errorHandler from "./middleware/error.middleware";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger"; 
import cors from "cors";
import morgan from "morgan";
import logger from "./config/logger";
import healthRoutes from "./routes/health.routes";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.routes"


const app = express();
app.use(
  morgan("combined", {
    stream: {
      write: (message) =>
        logger.info(message.trim()),
    },
  })
);


app.use(cors());

app.use(cookieParser());

app.use(express.json());

app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
);

// Routed
app.use("/api/auth",authRoutes);
app.use("/api/tasks",taskRoute);
app.use("/api/users", userRoutes);

app.get("/", (req, res)=>{
    res.send("Task-management API - TypeScript 🚀 ")
});
app.use("/health",healthRoutes);


app.use(errorHandler);

export default app;