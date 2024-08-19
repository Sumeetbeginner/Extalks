

import mongoose from "mongoose";

const ReportSchema = new mongoose.Schema({
    repUser:{
        //Id of user who reported this
        type:String,
        required:true
    },
    repType:{
        //Type of Report Object : Answer/Comment/Question
        type:String,
        required:true
    },
    repDesc:{
        type:String,
        required:true,
    },
    repCat:{
        //Category of Report - eg: Nudity/Violence/etc.
        type:String,
        required:true,
    }
}, {
    timestamps:true,
})

const Report = mongoose.model("Report", ReportSchema)

export default Report