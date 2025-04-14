import Task from "../Models/task.model.js"
import mongoose from "mongoose"

export const getAllTasks = async(req, res) =>{
    const tasks = await Task.find();
    res.status(200).send(tasks);
};

export const getTask = async(req, res) =>{
    const {id}=req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"Task not found."});
    }
    const tasks = await Task.findById(id);
    if (!tasks) return res.status(404).json({ error: "no such task found" });
        res.status(200).json({ data: tasks });
};

export const createTask = async(req,res)=>{
    const {title, description,subtasks,tags,due}=req.body;
    const obj={
        title,
        status:false,
        description,
        subtasks,
        tags,
        due
    }
    try{
        const task = await Task.create(obj);
        res.status(200).json(task);
    }catch{
        return res.status(404).json({error:"Task needs a title"})
    }
};

export const deleteTask = async(req,res)=>{
    const {id}=req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"Task not found."});
    }
    const tasks = await Task.findByIdAndDelete(id);
    res.status(200).json({ data: tasks });
};

export const updateTask = async(req,res)=>{
    const {title, description,subtasks,tags,due}=req.body;
    const obj={
        title,
        status:false,
        description,
        subtasks,
        tags,
        due
    }
    try{
        const task = await Task.findByIdAndUpdate({},obj);
        res.status(200).json(task);
    }catch{
        return res.status(404).json({error:"Task needs a title"})
    }
};