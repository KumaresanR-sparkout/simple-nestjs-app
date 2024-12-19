import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { AdminSchema, Admin } from "./models/admin.schema";


@Module({
    imports: [
        MongooseModule.forFeature(
            [
                { name: Admin.name, schema: AdminSchema }
            ]
        )
    ],
    controllers: [AdminController],
    providers: [AdminService]
})
export class AdminModule { }
