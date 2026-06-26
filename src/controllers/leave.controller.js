import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Leave } from "../model/leave.model.js";

export const applyLeave = asyncHandler(async (req, res) => {
    const { fromDate, toDate, reason } = req.body;

    const from = new Date(fromDate);
    const to = new Date(toDate);

    const days =
        Math.ceil((to - from) / (1000 * 60 * 60 * 24)) + 1;

    const leave = await Leave.create({
        employee: req.user.id,
        fromDate,
        toDate,
        reason,
        days,
    });

    return res.status(201).json(
        new ApiResponse(
            201,
            "Leave applied successfully",
            leave
        )
    );
});

export const getMyLeaves = asyncHandler(async (req, res) => {
    const leaves = await Leave.find({
        employee: req.user.id,
    }).sort({ createdAt: -1 });

    return res.status(200).json(
        new ApiResponse(
            200,
            "Leaves fetched successfully",
            leaves
        )
    );
});

// hr leaves methods
export const getPendingLeaves = asyncHandler(async (req, res) => {

    const leaves = await Leave.find({
        status: "Pending"
    })
        .populate("employee", "name email leaveBalance")
        .sort({ createdAt: -1 });

    return res.status(200).json(
        new ApiResponse(
            200,
            "Pending leave requests fetched successfully",
            leaves
        )
    );

});

export const hrActionOnLeave = asyncHandler(async (req, res) => {

    const { action } = req.body;

    const leave = await Leave.findById(req.params.leaveId);

    if (!leave) {
        throw new ApiError(404, "Leave request not found");
    }

    // HR cannot approve/reject twice
    if (leave.hrApproved || leave.status === "HR Rejected") {
        throw new ApiError(400, "HR has already reviewed this leave request");
    }

    if (action === "approve") {
        leave.status = "HR Approved";
        leave.hrApproved = true;
    }
    else if (action === "reject") {
        leave.status = "HR Rejected";
    }
    else {
        throw new ApiError(400, "Invalid action");
    }

    await leave.save();

    return res.status(200).json(
        new ApiResponse(
            200,
            `Leave ${action}d successfully by HR`,
            leave
        )
    );

});