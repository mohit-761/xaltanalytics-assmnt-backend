import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export function errorHandler(err, req, res, next){
    let status = 500;
    if(err instanceof ApiError) {
        status = err.statusCode;
    }
    let message = err.message;

    return res.status(status).send(new ApiResponse({
        statusCode: status,
        message: message || 'something went wrong',
    }))
}