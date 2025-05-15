import mongoose from "mongoose";

//title, status, description,subtasks,tags,due
const TaskSchema =new mongoose.Schema({
    columnId:{
        type:String,
        required:true
    },
    task:{
        type: String,
        required:true
    },
    status:{
        required:true
    },
    subtasks:{
        //Maybe change this to tasks later but subtask should probably just be strings that can be crossed out in react
        type: [String],
        required: false
    },
    // myabe get rid of this only have Tags for habits this seems hectic
    // If i don't get rid of this have tags be goals so tasks bbuild a percentage bar to monthly goal
    tags:{
        type: String,
        required:false
    },
    due:{
        type:Date,
        required:false
    }
}, {timestamps:true});

//creates task collection
const Task = mongoose.model('Task',TaskSchema);
export default Task;

