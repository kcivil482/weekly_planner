import {Task, Board} from "../Models/task.model.js"
import { ObjectId } from 'mongoose';
import mongoose from "mongoose"

// export const getAllTasks = async(req, res) =>{
//     const tasks = await Task.find();
//     res.status(200).send(tasks);
// };

export const getBoard = async(req, res) =>{
    /**Cases:
    * if the board doesn't alraedy exist in database make a new one
    *  
    */
   let board  = await Board.findOne();
   console.log("getBoard called", board)
   if(!board){
     board= new Board({
        groups:{
            A:[],
            B:[],
            C:[],
            D:[],
            E:[],
            F:[],
            G:[],
            H:[]
        }
    })
    board.save();
    let board  = await Board.findOne();
   }
   res.status(200).send( board);
};

export const AddTask = async(req,res)=>{
    /**Cases:
     * if no id is given
     * no matching id in database
     * if that id is already in a group in Board
    */

    try{
        const {id} = req.params;
        const board  = await Board.findOne();

        console.log(id)
        if( !id || board.groups.A.includes(id))
        { return res.status(404).json({error:"no id found or id already in database" + id})}
        board.groups.A.push(id)
        await board.save();
        console.log("Board After Add task: ", board)
        res.status(200).json(board);
    }catch{
        return res.status(404).json({error:"Board not updated "})
    }
};

export const deleteTask = async (req,res)=>{
    /**Cases:
     * id not given
     * 
    */
    try{
        const {id} = req.params
        const keys = ["A","B","C","D","E","F","G","H"]
        const board = await Board.findOne()
        console.log(board, id)
        for (const key of keys) {
            if (board.groups[key].includes(id)) {
                const temp=board.groups[key];
                const newlist = board.groups[key].filter(item => !(item.toString().includes(id)))
                board.groups[key] = newlist  
                await board.save()            
                console.log(board)  
            }
        }
         res.status(200).json(board)
    }catch{
        res.status(404).json({error:" Board not updated check id"})
    }
 
}

export const updateBoard = async (req,res)=>{
    /**
     * Cases:
     * 
     */

 
    try{
        const board = await Board.findOne();
        console.log("update board board found:", board)
        if(!board){ return res.status(404).json({error:"no board found"})}
        const { groups } = req.body
        console.log("groups: ", groups)
        if(!groups) {return res.status(404).json({error:" Board data sent incorrectly"})}

        board["groups"] = groups;
        await board.save()
        console.log("Board after update board is called", board["groups"])



        res.status(200).json(board)
    } catch{
        return res.status(404).json({error:"board not updated"})
    }

}


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