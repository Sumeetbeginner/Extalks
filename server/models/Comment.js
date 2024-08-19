

import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    commUser:{
        //Id of user who commented this
        type:String,
        required:true
    },
    commDesc:{
        type:String,
        required:true
    },
    commUpV:{
        //Array of Id of User who upvoted this comment
        type:Array,
        default:[]
    },
    commAns:{
        //Id of answer whose comment is
        type:String,
        required:true
    },
}, {
    timestamps:true
})

const Comment = mongoose.model("Comment", CommentSchema)

export default Comment