import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../model/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from '../utils/ApiResponse.js';
import { comparePassword, hashPassword } from "../utils/password.js";
import { Role } from "../model/role.model.js";

export const register = asyncHandler(async (req, res) => {
    
    const { name, email, password, role } = req.body;

    const alreadyExists = await User.findOne({ email });

    if (alreadyExists) {
        throw new ApiError(400, 'user already exists. please login');
    }

    const roleData = await Role.findOne({ name: role });

    if (!roleData) {
       throw new ApiError(400, 'please enter a valid role');
    }

    const hashedPassword = await hashPassword(password, 10);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role: roleData._id,
    });

    res.status(201).json(new ApiResponse(200, 'user registered successfully', user));
});

export const login = asyncHandler(async (req, res) => {

    const { email, password } = req.body;

    const user = await User.findOne({ email }).populate("role");

    if (!user) {
        throw new ApiError(0, 'user not found');
    }

    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) {
        throw new ApiError(0, 'please enter a correct password')
    }

    const token = generateToken(user._id, user?.role?.name);

    return res.status(200).json(new ApiResponse(1, 'user logged in successfully', {
            token,
            user,
        }));
});

export const generateToken = (userId, role) => {
    return jwt.sign(
        {
            id: userId,
            role,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1d",
        }
    );
};