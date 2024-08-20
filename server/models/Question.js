import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({

    questDesc :{
        type:String,
        required:true
    },
    questImg :{
        type:String,
    },
    questAns :{
        //Array of ID's of Answers of this Question
        type:Array,
        default:[]
    },
    questFollC :{
        //Array of ID's of Users who Follows this Question
        type:Array,
        default:[]
    },
    questUser :{
        //ID of user who asked the question 
        type:String,
        required:true,
    },

}, { timestamps: true });

const Question = mongoose.model("Question", QuestionSchema);

export default Question;
