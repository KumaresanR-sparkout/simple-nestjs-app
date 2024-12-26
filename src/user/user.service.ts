import { Injectable } from '@nestjs/common';
import { User } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from "./DTOs/create_user_dto";

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) { }

    // constructor(@InjectModel(User.name) private userSchema: Model<User>) { }

    async postUser(data: CreateUserDto) {
        // console.log(data)
        // return false
        const admin = await this.userModel.create(data)
        console.log(admin)
        return admin
    }
}
