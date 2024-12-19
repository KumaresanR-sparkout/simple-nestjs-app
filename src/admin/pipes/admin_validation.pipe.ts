import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import * as Joi from "joi"


@Injectable()
export class CreateAdminValidation implements PipeTransform {

    #emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

    schema = Joi.object({
        first_name: Joi.string().required().messages({
            "any.required": "First name must be required",
            "string.base": "First name must be string",
            "string.empty": "First name cannot be empty",

        }),
        last_name: Joi.string().required().messages({
            "any.required": "Last name must be required",
            "string.base": "Last name must be string",
            "string.empty": "Last name cannot be empty",

        }),
        password: Joi.string().pattern(new RegExp(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/)).required().messages({
            "any.required": "Password must be required",
            "string.base": "Password must be string",
            "string.empty": "Password cannot be empty",
            "string.pattern.base": "Enter valid password"
        }),
        email: Joi.string().pattern(this.#emailPattern).required().messages({
            "any.required": "Email must be required",
            "string.base": "Email must be string",
            "string.pattern.base": "Invalid email format",
            "string.empty": "Email cannot be empty"
        }),
        phone_number: Joi.string().pattern(/^\+?[0-9\s]+$/).min(4).max(16).required().messages({
            "any.required": "Phone number must be required",
            "string.base": "Phone number must be string",
            "string.empty": "Phone number cannot be empty",
            "string.min": "Phone number must be minimum 4 digit number",
            "string.max": "Phone number must be maximum 15 digit number"

        }),
        country_code: Joi.string().required().messages({
            "any.required": "Country code must be required",
            "string.base": "Country code must be string",
            "string.empty": "Counatry code cannot be empty",
        })
    })

    constructor() { }
    transform(value: any, metadata: ArgumentMetadata) {
        const { error } = this.schema.validate(value)

        if (error) {
            throw new BadRequestException(error.message.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, ''))
        }
        return value;
    }
}


@Injectable()
export class LoginAdminValidate implements PipeTransform {

    #emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

    schema = Joi.object({
        email: Joi.string().pattern(this.#emailPattern).required().messages({
            "any.required": "Email must be required",
            "string.base": "Email must be string",
            "string.pattern.base": "Invalid email format",
            "string.empty": "Email cannot be empty"
        }),
        password: Joi.string().pattern(new RegExp(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/)).required().messages({
            "any.required": "Password must be required",
            "string.base": "Password must be string",
            "string.empty": "Password cannot be empty",
            "string.pattern.base": "Enter valid password"
        })
    })
    constructor() { }
    transform(value: any, metadata: ArgumentMetadata) {

        const { error } = this.schema.validate(value)

        if (error) {
            throw new BadRequestException(error.message.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, ''))
        }
        return value;
    }
}

@Injectable()
export class UpdateAdminValidate implements PipeTransform {

    schema = Joi.object({
        first_name: Joi.string().messages({
            "string.base": "First name must be string",
            "string.empty": "First name cannot be empty",

        }),
        last_name: Joi.string().messages({
            "string.base": "Last name must be string",
            "string.empty": "Last name cannot be empty",

        }),
        phone_number: Joi.string().pattern(/^\+?[0-9\s]+$/).min(4).max(16).messages({
            "string.base": "Phone number must be string",
            "string.empty": "Phone number cannot be empty",
            "string.min": "Phone number must be minimum 4 digit number",
            "string.max": "Phone number must be maximum 15 digit number"

        }),
        country_code: Joi.string().messages({
            "string.base": "Country code must be string",
            "string.empty": "Counatry code cannot be empty"
        })
    })

    constructor() { }
    transform(value: any, metadata: ArgumentMetadata) {

        const { error } = this.schema.validate(value)

        if (error) {
            throw new BadRequestException(error.message.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, ''))
        }
        return value;
    }
}