import express from "express"
import {getAllTasks,getTask,createTask,updateTask,deleteTask} from "../Controllers/task.controller"

const router= express.Router();

router.get("/", getAllTasks)
router.get("/:id", getTask)
router.post("/", createTask)
router.patch("/", updateTask)
router.delete("/:id", deleteTask)

export default router;