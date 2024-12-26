import { Module } from '@nestjs/common';
import { UserSchema, User } from "./schemas/user.schema";
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema }
        ])
    ],
    controllers: [UserController],
    providers: [UserService]
})
export class UserModule { }
