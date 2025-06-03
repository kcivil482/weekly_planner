import {Task, Board} from "../Models/task.model.js"

import mongoose from "mongoose"

// export const getAllTasks = async(req, res) =>{
//     const tasks = await Task.find();
//     res.status(200).send(tasks);
// };

export const getBoard = async(req, res) =>{
   const board  = await Board.findOne();
   if(!board){
    const newBoard= new Board({
        groups:{
            A:[],
            B:[],
            C:[],
            D:[],
            E:[],
            F:[],
            G:[],
            H:[],
        }
    })
    newBoard.save();
    const board  = await Board.findOne();
   }

   res.status(200).send( board);
};

export const updateBoard = async(req,res)=>{
    try{
        const board = await Board.findOne();
        const test = await Task.findOne();

        board.groups.A.push(test._id)
        await board.save();

        res.status(200).json(board);
    }catch{
        return res.status(404).json({error:"Board not updated"})
    }
};

//update board

// export const createTask = async(req,res)=>{
//     const {columnId,task,subtasks,tags,due}=req.body;
//     const obj={
//         columnId,
//         task,
//         status:false,
//         subtasks,
//         tags,
//         due
//     }
//     try{
//         const task = await Task.create(obj);
//         res.status(200).json(task);
//     }catch{
//         return res.status(404).json({error:"Task needs a title"})
//     }
// };

// export const deleteTask = async(req,res)=>{
//     const {id}=req.params;

//     if(!mongoose.Types.ObjectId.isValid(id)){
//         return res.status(404).json({error:"Task not found."});
//     }
//     const tasks = await Task.findByIdAndDelete(id);
//     res.status(200).json({ data: tasks });
// };

// export const updateTask = async(req,res)=>{
//     const {id} = req.params;
//     const {columnId,task,subtasks,tags,due}=req.body;
//     const obj={
//         columnId,
//         task,
//         status:false,
//         subtasks,
//         tags,
//         due
//     }
//     try{
//         const task = await Task.findByIdAndUpdate( id ,obj);
//         res.status(200).json(task);
//     }catch{
//         return res.status(404).json({error:"Task needs a title"})
//     }
// };