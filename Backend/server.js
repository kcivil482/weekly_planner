import express from "express";
import dotenv from "dotenv";
import taskRoutes from "./Routes/task.routes"
import mongoose from "mongoose"

dotenv.config();
const app = express();
const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;


app.use(express.json());
app.use("/task",taskRoutes);

app.get("/",(req,res)=>{
    res.send("server ready");
})

app.listen(PORT,()=>{  
    console.log("server running")
    mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });
});