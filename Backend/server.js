import express from "express";
import dotenv from "dotenv";
import taskRoutes from "./Routes/task.routes"

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use("/task",taskRoutes);

app.get("/",(req,res)=>{
    res.send("server ready");
})

app.listen(PORT,()=>{  
    console.log("server running")
});