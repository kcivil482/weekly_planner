import mongoose from "mongoose";

const TaskSchema =new mongoose.Schema({
    title:{
        type: String,
        require:true
    },
    status:{
        tpye:Boolean,
        require:true
    },
    description:{
        type:String,
        require:false
    },
    subtasks:{
        //Maybe change this to tasks later but subtask should probably just be strings that can be crossed out in react
        type: [String],
        require: false
    },
    // myabe get rid of this only have Tags for habits this seems hectic
    // If i don't get rid of this have tags be goals so tasks bbuild a percentage bar to monthly goal
    Tags:{
        type:String,
        require:false
    },
    due:{
        type:Date,
        require:false
    }
}, {timestamps:true});

//creates task collection
const Task = mongoose.model('Task',TaskSchema);
export default Task;

