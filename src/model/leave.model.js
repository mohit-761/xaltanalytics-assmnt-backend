import mongoose from "mongoose";

const leaveSchema = new mongoose.Schema({

    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    fromDate: Date,

    toDate: Date,

    reason: String,

    days: Number,

    status: {
        type: String,
        enum: [
            "Pending",
            "HR Approved",
            "HR Rejected",
            "Admin Approved",
            "Admin Rejected"
        ],
        default: "Pending"
    },

    hrApproved: {
        type: Boolean,
        default: false
    },

    adminApproved: {
        type: Boolean,
        default: false
    }

}, { timestamps: true });

export let Leave = mongoose.model("Leave", leaveSchema);