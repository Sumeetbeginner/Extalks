

import mongoose from "mongoose";

const AnswerSchema = new mongoose.Schema({
    ansDesc:{
        type:String,
        required:true,
    },
    ansPic:{
        type:String,
    },
    ansUpV:{
        //Array of User ID's who upvoted the answer
        type:Array,
        default:[]
    },
    ansDownV:{
        //Array of User ID's who downvoted the answer
        type:Array,
        default:[]
    },
    comments:{
        //Array of ID's of all comments of this answer
        type:Array,
        default:[]
    },
    ansQuest:{
        //ID's of Question of this answer
        type:String,
        required:true
    },
    ansUser:{
        //ID's of User who answered this
        type:String,
        required:true
    },
    
}, {
    timestamps:true,
})

const Answer = mongoose.model("Answer", AnswerSchema)

export default Answer