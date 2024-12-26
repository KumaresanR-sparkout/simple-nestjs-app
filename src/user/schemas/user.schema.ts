import { HydratedDocument } from "mongoose";
import { SchemaFactory, Prop, Schema } from "@nestjs/mongoose";


export type UserDocument = HydratedDocument<User>

@Schema({
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    versionKey: false
})
export class User {

    @Prop({ required: true, trim: true })
    name: string

    @Prop({ required: true })
    age: number

    @Prop({ required: true, trim: true, unique: true })
    email: string

    @Prop({ required: true, minlength: 5, maxlength: 15, trim: true })
    password: string

    @Prop({ required: true, trim: true })
    phone_number: string

}


export const UserSchema = SchemaFactory.createForClass(User)