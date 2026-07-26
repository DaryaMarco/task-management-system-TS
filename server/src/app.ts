import express from "express";
import authRoutes from "./routes/auth.routes" ;
import taskRoute from "./routes/task.route";
import errorHandler from "./middleware/error.middleware";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger"; 

const app  = express();

app.use(express.json());

app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
);
// Routed
app.use("/api/auth",authRoutes);
app.use("/api/tasks",taskRoute);

app.get("/", (req, res)=>{
    res.send("Task-management API - TypeScript 🚀 ")
})

app.use(errorHandler);

export default app;