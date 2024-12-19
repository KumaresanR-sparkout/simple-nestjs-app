
import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();
        const message = exception.getResponse()

        console.log("The Http error Exception is called. ❌");

        const result = {
            status: false,
            status_code: status,
            message: message,
            timestamp: new Date().toISOString(),
            path: request.url
        }

        console.log(result);
        delete result?.timestamp;

        response
            .status(status)
            .json(result);
    }
}
