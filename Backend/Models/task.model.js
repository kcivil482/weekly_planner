import mongoose from "mongoose";

//title, status, description,subtasks,tags,due
const TaskSchema =new mongoose.Schema({
    columnId:{
        type:String,
        required:false
    },
    task:{
        type: String,
        required:true
    },
    status:{
        type: Boolean,
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
export const Task = mongoose.model('Task',TaskSchema);

const BoardSchema =new mongoose.Schema({
        groups:{
            A:{
                type:[mongoose.mongoose.ObjectId],
                ref:'Task'
            },
            B:{
                type:[mongoose.mongoose.ObjectId],
                ref:'Task'
            },
            C:{
                type:[mongoose.mongoose.ObjectId],
                ref:'Task'
            },
            D:{
                type:[mongoose.mongoose.ObjectId],
                ref:'Task'
            },
            E:{
                type:[mongoose.mongoose.ObjectId],
                ref:'Task'
            },
            F:{
                type:[mongoose.mongoose.ObjectId],
                ref:'Task'
            },
            G:{
                type:[mongoose.mongoose.ObjectId],
                ref:'Task'
            },
            H:{
                type:[mongoose.mongoose.ObjectId],
                ref:'Task'
            }
        }
},{timestamps:true});

export const Board = mongoose.model('Board',BoardSchema);


