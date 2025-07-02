import express from "express"
import {getBoard,AddTask,deleteTask,updateBoard} from "../Controllers/board.controller.js"

const router= express.Router();

router.get("/", getBoard)
router.patch('/:id', AddTask)
router.delete("/:id",deleteTask)
router.put("/",updateBoard)



export default router;