import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({

    employee:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    date:{
        type:Date,
        default:Date.now
    },

    status:{
        type:String,
        enum:["Present","Absent"],
        default:"Present"
    }

},{timestamps:true});

export let Attendance = mongoose.model("Attendance",attendanceSchema);