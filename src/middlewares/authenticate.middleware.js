import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";

export function authenticate(req, res, next) {

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new ApiError(401, "Access denied. Please login first.");
    }

    const token = authHeader.split(" ")[1];

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        return next();

    } catch (error) {

        throw new ApiError(401, "Invalid or expired token. Please login again.");

    }
}