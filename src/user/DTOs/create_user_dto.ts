import { IsNotEmpty, IsNumber, MinLength, MaxLength, IsEmail, IsPhoneNumber } from "class-validator";


export class CreateUserDto {

    @IsNotEmpty()
    name: string

    @IsNumber()
    @IsNotEmpty()
    age: number

    @IsEmail()
    @IsNotEmpty()
    email: string

    @MinLength(5, { message: "Password must be minimum 5 characters" })
    @MaxLength(15, { message: "Password must be maximum 15 characters" })
    password: string

    @IsPhoneNumber("IN")
    phone_number: string
}