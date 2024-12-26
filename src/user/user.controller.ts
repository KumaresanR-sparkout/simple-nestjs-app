import { Controller, ValidationPipe, Body, Res, HttpException, Post } from '@nestjs/common';
import { Response } from 'express';
import { CreateUserDto } from './DTOs/create_user_dto';
import { UserService } from './user.service';
import { successResponse, errorResponse } from 'utils/response_handler';


@Controller('/api/v1/user')

export class UserController {
    constructor(private userService: UserService) { }

    @Post()
    async createUser(@Body(new ValidationPipe({ transform: true, whitelist: true })) createUserDto: CreateUserDto, @Res() res: Response) {
        try {
            
            const user = await this.userService.postUser(createUserDto);

            if (!user) {
                return errorResponse(res, 400, "User creation failed.")
            }

            return successResponse(res, 200, "User created successfully", user);
        }
        catch {
            throw new HttpException("Internal server error", 500);
        }
    }
}
