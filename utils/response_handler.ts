import { Response } from "express"

// To create interface for success and error responses.

interface SuccessResponse {
    status: boolean,
    status_code: number,
    message: string,
    data: object
}


interface ErrorResponse {
    status: boolean,
    status_code: number,
    message: string,
    data: object
}


// This is related to success response
export const successResponse = (res: Response, statusCode: number, message: string, data: object) => {

    const response: SuccessResponse = {
        status: true,
        status_code: statusCode,
        message: message,
        data: data || {}
    }

    return res.status(statusCode).json(response);
}

// This is related to error response
export const errorResponse = (res: Response, statusCode: number, message: string) => {

    const response: ErrorResponse = {
        status: true,
        status_code: statusCode || 500,
        message: message,
        data: {}
    }

    return res.status(statusCode).json(response);
}