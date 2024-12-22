import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { AdminSchema, Admin } from "./models/admin.schema";
import { CreateAuthToken } from "../../utils/jwt_token_authentication";


@Module({
    imports: [
        MongooseModule.forFeatureAsync(
            [
                {
                    name: Admin.name,
                    useFactory: () => {
                        const schema = AdminSchema;
                        schema.pre("find", excludeDeletedRecord);
                        schema.pre("findOne", excludeDeletedRecord);
                        schema.pre("countDocuments", excludeDeletedRecord);
                        schema.pre("distinct", excludeDeletedRecord);
                        schema.pre("aggregate", function (next) {
                            this.pipeline().unshift({ $match: { is_deletd: false } })
                            next();
                        });
                        return schema;
                    }
                }
            ]
        )
    ],
    controllers: [AdminController],
    providers: [AdminService, CreateAuthToken]
})
export class AdminModule { }



function excludeDeletedRecord(next: any) {
    this.where({ is_deleted: { $exists: true, $eq: false } });
    next();
}
