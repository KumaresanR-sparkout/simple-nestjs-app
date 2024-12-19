import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from "@nestjs/common";
import * as Joi from "joi";

@Injectable()
export class IsObjectId implements PipeTransform {
    constructor() { }

    schema = Joi.string().hex().length(24).required().error(new Error("Must be vail id."))
    transform(value: any, metadata: ArgumentMetadata) {
        const { error } = this.schema.validate(value);

        if (error) {
            throw new BadRequestException(error.message.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, ''))
        }

        return value;
    }
}

