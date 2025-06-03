import express from "express"
import {getBoard,updateBoard} from "../Controllers/board.controller.js"

const router= express.Router();

router.get("/", getBoard)
router.patch("/", updateBoard)



export default router;