import { Leave } from "../model/leave.model.js";
import { User } from "../model/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getHrApprovedLeaves = asyncHandler(async (req, res) => {

    const leaves = await Leave.find({
        status: "HR Approved"
    })
        .populate("employee", "name email leaveBalance")
        .sort({ createdAt: -1 });

    return res.status(200).json(
        new ApiResponse(
            200,
            "HR approved leave requests fetched successfully",
            leaves
        )
    );

});

export const adminActionOnLeave = asyncHandler(async (req, res) => {

    const { action } = req.body;

    const leave = await Leave.findById(req.params.leaveId);

    if (!leave) {
        throw new ApiError(404, "Leave request not found");
    }

    if (leave.status !== "HR Approved") {
        throw new ApiError(
            400,
            "Only HR approved leave requests can be reviewed by Admin"
        );
    }

    if (leave.adminApproved) {
        throw new ApiError(
            400,
            "Admin has already reviewed this leave request"
        );
    }

    if (action === "approve") {

        const employee = await User.findById(leave.employee);

        if (!employee) {
            throw new ApiError(404, "Employee not found");
        }

        if (employee.leaveBalance < leave.days) {
            throw new ApiError(400, "Insufficient leave balance");
        }

        employee.leaveBalance -= leave.days;
        await employee.save();

        leave.status = "Admin Approved";
        leave.adminApproved = true;

    } else if (action === "reject") {

        leave.status = "Admin Rejected";
        leave.adminApproved = true;

    } else {
        throw new ApiError(400, "Invalid action");
    }

    await leave.save();

    return res.status(200).json(
        new ApiResponse(
            200,
            `Leave ${action}d successfully by Admin`,
            leave
        )
    );

});