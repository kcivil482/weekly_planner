import express from "express"
import {getAllTasks,getTask,createTask,updateTask,deleteTask} from "../Controllers/task.controller.js"

const router= express.Router();

router.get("/", getAllTasks)
router.get("/:id", getTask)
router.post("/", createTask)
router.patch("/:id", updateTask)
router.delete("/:id", deleteTask)

export default router; 