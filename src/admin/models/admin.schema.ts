import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";


export type AdminDocument = HydratedDocument<Admin>

@Schema(
    {
        timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
        versionKey: false
    }
)
export class Admin {
    @Prop({ required: true, trim: true })
    first_name: string

    @Prop({ trim: true })
    last_name: string

    @Prop({ required: true, trim: true })
    password: string

    @Prop({ required: true, unique: true })
    email: string

    @Prop({ required: true, unique: true })
    phone_number: string

    @Prop({ required: true, trime: true })
    country_code: string

    @Prop({ default: false })
    is_deleted: false
}


export const AdminSchema = SchemaFactory.createForClass(Admin);