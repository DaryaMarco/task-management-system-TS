import express from "express";
import authRoutes from "./routes/auth.routes" ;
import taskRoute from "./routes/task.route";
import errorHandler from "./middleware/error.middleware";

const app  = express();

app.use(express.json());

// Routed
app.use("/api/auth",authRoutes);
app.use("/api/tasks",taskRoute);

app.get("/", (req, res)=>{
    res.send("Task-management API - TypeScript 🚀 ")
})

app.use(errorHandler);

export default app;